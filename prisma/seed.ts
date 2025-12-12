import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Sony admin account
  const sonyPassword = await bcrypt.hash('BGWealth2024!', 12);
  const sony = await prisma.user.upsert({
    where: { email: 'mrsonyho@gmail.com' },
    update: {
      password: sonyPassword,
      role: 'ADMIN',
    },
    create: {
      email: 'mrsonyho@gmail.com',
      password: sonyPassword,
      firstName: 'Sony',
      lastName: 'Ho',
      role: 'ADMIN',
    },
  });
  console.log('Created/updated admin user:', sony.email);

  // Create Lee admin account
  const leePassword = await bcrypt.hash('BGWealth2024!', 12);
  const lee = await prisma.user.upsert({
    where: { email: 'lee@bgwealth.com' },
    update: {
      password: leePassword,
      role: 'ADMIN',
    },
    create: {
      email: 'lee@bgwealth.com',
      password: leePassword,
      firstName: 'Lee',
      lastName: 'Meadows',
      role: 'ADMIN',
    },
  });
  console.log('Created/updated admin user:', lee.email);

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
