import { PrismaClient } from '@prisma/client';
import { roles } from './roles';
import { permissions } from './permissions';

const prisma = new PrismaClient();

async function main() {
  try {
    await roles(prisma).catch((e: any) => {
      console.error('Error seeding Roles:', e);
    });
    await permissions(prisma).catch((e: any) => {
      console.error('Error seeding Permissions:', e);
    });
  } catch (error) {
    console.error('Error seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error('Error in main seeding:', error);
    // process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
