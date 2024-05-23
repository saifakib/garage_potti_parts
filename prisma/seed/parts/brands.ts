import { PrismaClient } from '@prisma/client';

export async function seedBrands(prisma: PrismaClient) {
  const brandNames = [
    'BMW',
    'Mercedes-Benz',
    'Audi',
    'Tesla',
    'Toyota',
    'Honda',
    'Nissan',
    'Kia',
    'Volkswagen',
    'Ford',
    'General Motors',
    'Hyundai',
    'Peugeot',
    'Renault',
    'Volvo',
    'Fiat',
    'Seat',
    'Opel',
    'KTM',
    'Suzuki',
    'Yamaha',
    'Harley-Davidson',
    'Kawasaki',
  ];

  const createdBrands = await prisma.brands.createMany({
    data: brandNames.map((name) => ({ name })),
    skipDuplicates: true,
  });

  console.log(`${createdBrands.count} brand(s) created`);
}
