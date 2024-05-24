import { PrismaClient } from '@prisma/client';

export async function roles(prisma: PrismaClient) {
  const roles = await prisma.roles.createMany({
    data: [
      {
        name: 'ROOT ADMIN',
        slug: 'ROOT_ADMIN',
        systemRole: true,
      },
      {
        name: 'SUPER ADMIN',
        slug: 'SUPER_ADMIN',
        systemRole: true,
      },
      {
        name: 'PROVIDER',
        slug: 'PROVIDER',
        systemRole: true,
      },
      {
        name: 'CONSUMER',
        slug: 'CONSUMER',
        systemRole: true,
      },
    ],
    skipDuplicates: true,
  });

  console.log('Roles Seeded Successfully', roles);
}
