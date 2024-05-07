import { PrismaClient } from '@prisma/client';

export async function roles(prisma: PrismaClient) {
  const roles = await prisma.roles.createMany({
    data: [
      {
        name: 'ROOT ADMIN',
        slug: 'ROOT_ADMIN',
        system_role: true,
      },
      {
        name: 'SUPER ADMIN',
        slug: 'SUPER_ADMIN',
        system_role: true,
      },
      {
        name: 'PROVIDER',
        slug: 'PROVIDER',
        system_role: true,
      },
      {
        name: 'CONSUMER',
        slug: 'CONSUMER',
        system_role: true,
      },
    ],
    skipDuplicates: true,
  });

  console.log('Roles Seeded Successfully', roles);
}
