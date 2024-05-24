import { PrismaClient } from '@prisma/client';

export async function seedVehicleTypes(prisma: PrismaClient) {
  const names = ['Car', 'Bike'];

  const createdVehicleTypes = await prisma.vehicleTypes.createMany({
    data: names.map((name) => ({ name })),
    skipDuplicates: true,
  });

  console.log(`${createdVehicleTypes.count} vehicle types created`);
}
