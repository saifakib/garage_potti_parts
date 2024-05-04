import { PrismaClient } from '@prisma/client';

export async function roles(prisma: PrismaClient) {
  const roles = await prisma.roles.createMany({
    data: [
      {
        name: 'ROOT ADMIN',
        slug: 'ROOT_ADMIN',
      },
      {
        name: 'SUPER ADMIN',
        slug: 'SUPER_ADMIN',
      },
      {
        name: 'PROVIDER',
        slug: 'PROVIDER',
      },
      {
        name: 'CONSUMER',
        slug: 'CONSUMER',
      },
    ],
    skipDuplicates: true,
  });

  console.log('Roles Seeded Successfully', roles);
}
