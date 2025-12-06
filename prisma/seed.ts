import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@bgwealth.com' },
    update: {},
    create: {
      email: 'admin@bgwealth.com',
      password: adminPassword,
      firstName: 'Lee',
      lastName: 'Meadows',
      role: 'ADMIN',
    },
  });
  console.log('Created admin user:', admin.email);

  // Create demo member
  const memberPassword = await bcrypt.hash('member123', 12);
  const member = await prisma.user.upsert({
    where: { email: 'member@bgwealth.com' },
    update: {},
    create: {
      email: 'member@bgwealth.com',
      password: memberPassword,
      firstName: 'Demo',
      lastName: 'Member',
      role: 'MEMBER',
    },
  });
  console.log('Created member user:', member.email);

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
