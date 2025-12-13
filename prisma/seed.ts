import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Start seeding...');

  const categories = [
    'Books',
    'Electronics',
    'Fashion & Apparel',
    'Dorm Equipment',
    'Stationery',
    'Others',
  ];

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('✅ Categories seeded');

  const adminEmail = 'admin@campusswap.dev';
  const adminPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      fullname: 'Admin CampusSwap',
      studentId: 'ADMIN001',
      email: adminEmail,
      password: adminPassword,
      role: Role.ADMIN,
      points: 0,
    },
  });

  console.log('✅ Admin user seeded');

  console.log('🌱 Seeding finished');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
