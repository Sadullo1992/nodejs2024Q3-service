import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const FAV_ID = '0a35dd62-e09f-434b-a628-f4e7a6964f57';

export const seedDatabase = async () => {
  await prisma.favs.upsert({
    where: { id: FAV_ID },
    update: {},
    create: {
      id: FAV_ID,
    },
  });
};
