import { PrismaClient, UserType } from '@prisma/client';
import { hashSync } from 'bcryptjs';

export async function rootUser(prisma: PrismaClient) {
  const rootAdmin = await prisma.users.createMany({
    data: [
      {
        user_type: UserType.ROOT_ADMIN,
        email: 'rootadmin1@gmail.com',
        mobile: '+8801842317359',
        password: hashSync('rootAdmin1', 10),
      },
      {
        user_type: UserType.ROOT_ADMIN,
        email: 'rootadmin2@gmail.com',
        password: hashSync('rootAdmin2', 10),
      },
    ],
    skipDuplicates: true,
  });

  const superAdmin = await prisma.users.createMany({
    data: [
      {
        user_type: UserType.SUPER_ADMIN,
        email: 'superadmin1@gmail.com',
        password: hashSync('superAdmin1', 10),
      },
      {
        user_type: UserType.SUPER_ADMIN,
        email: 'superadmin2@gmail.com',
        password: hashSync('superAdmin2', 10),
      },
    ],
    skipDuplicates: true,
  });

  await assignRoleToUser(prisma, UserType.ROOT_ADMIN, 'ROOT_ADMIN');
  console.log('Root admin created', rootAdmin);
  await assignRoleToUser(prisma, UserType.SUPER_ADMIN, 'SUPER_ADMIN');
  console.log('Super admin created', superAdmin);
}

const assignRoleToUser = async (prisma: PrismaClient, userType: UserType, roleSlug: String) => {
  const role = await prisma.roles.findUnique({
    where: {
      slug: `${roleSlug}`,
    },
    select: {
      id: true,
      uuid: true,
    },
  });
  if (role && role.uuid) {
    await prisma.users.updateMany({
      where: {
        user_type: userType,
      },
      data: {
        roleUuid: role.uuid,
      },
    });
  }
};
