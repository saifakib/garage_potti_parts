import { PrismaClient } from '@prisma/client';
import { PERMISSIONS } from './permissions/permissions_list';

import {
  CONSUMER_DEFAULT_PERMISSIONS,
  PROVIDER_DEFAULT_PERMISSIONS,
  GLOBAL_PERMISSIONS,
} from './permissions/default.permissions';

interface Permission {
  group: string;
  name: string;
  slug: string;
  description: string;
}

export async function permissions(prisma: PrismaClient) {
  const permissions = await prisma.permissions.createMany({
    data: [...PERMISSIONS] as Permission[],
    skipDuplicates: true,
  });

  await roleWisePermissionAssignSeed(prisma, [...CONSUMER_DEFAULT_PERMISSIONS, ...GLOBAL_PERMISSIONS], 'CONSUMER');
  await roleWisePermissionAssignSeed(prisma, [...PROVIDER_DEFAULT_PERMISSIONS, ...GLOBAL_PERMISSIONS], 'PROVIDER');
  console.log('Permissions Seeded Successfully: ', permissions);
}

async function roleWisePermissionAssignSeed(prisma: PrismaClient, permissionList: string[], roleSlug: string) {
  try {
    const role = await prisma.roles.findUnique({
      where: {
        slug: roleSlug,
      },
    });

    permissionList.map(async (permission: string) => {
      const permissionId: any = await prisma.permissions.findUnique({
        where: {
          slug: permission,
        },
        select: {
          id: true,
        },
      });
      console.log(permissionId, permission, role?.id);
      await prisma.roles.update({
        where: {
          id: role?.id,
        },
        data: {
          permissions: {
            connect: [permissionId],
          },
        },
      });
    });
  } catch (error: any) {
    console.log(error);
  }
}
