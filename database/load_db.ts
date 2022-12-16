import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  await prisma.$connect();

  const adminUser = await prisma.user.create({
    data: {
      name: 'admin',
      email: 'admin@example.org',
      password: 'admin',
      role: 'ADMIN',
      blockchainAddress: '0x0000000000000000000000000000000000000000',
    },
  });

  await prisma.$disconnect();

  console.log('====================');
  console.log('Admin User :');
  console.log(adminUser);
  console.log('====================');
}

main().then();
