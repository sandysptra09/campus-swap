import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.findMany();
  const users = await prisma.user.findMany({
    select: {
      id: true,
      fullname: true,
      email: true,
      role: true,
      points: true,
    },
  });

  console.log('📦 Categories:', categories);
  console.log('👤 Users:', users);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
