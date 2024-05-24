import { PrismaClient } from '@prisma/client';
import { seedPartsCategories } from './categories';
import { seedBrands } from './brands';
import { seedEngines } from './engines';
import { seedModels } from './models';
import { seedVehicleTypes } from './vehicle-types';

export async function parts(prisma: PrismaClient) {
  try {
    await seedPartsCategories(prisma).catch((e: any) => {
      console.error('Error seeding Parts Category:', e);
    });
    await seedBrands(prisma).catch((e: any) => {
      console.error('Error seeding Brands:', e);
    });
    await seedEngines(prisma).catch((e: any) => {
      console.error('Error seeding Engines:', e);
    });
    await seedModels(prisma).catch((e: any) => {
      console.error('Error seeding Models:', e);
    });
    await seedVehicleTypes(prisma).catch((e: any) => {
      console.error('Error seeding VehicleTypes:', e);
    });
  } catch (error) {
    console.error('Error seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}
