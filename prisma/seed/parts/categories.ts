import { PrismaClient } from '@prisma/client';

export async function seedPartsCategories(prisma: PrismaClient) {
  const categories: string[] = [
    'Lubricant',
    'Brakes',
    'Filter',
    'Horn',
    'Tyre',
    'Electronics',
    'Spark-Plug',
    'Shock-Absorber',
    'Tools',
    'Body-Parts',
    'Battery',
    'Bulb-Led',
    'Car-Care-Product',
    'Lighting',
    'Body-Kit',
  ];

  const createdCategories = await prisma.partsCategory.createMany({
    data: categories.map((name) => ({ name })),
    skipDuplicates: true,
  });

  console.log(`${createdCategories.count} parts categories seeded successfully.`);
}
