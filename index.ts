import express from 'express';

import { PrismaClient } from '@prisma/client';
import loginRouter from './src/auth/controller/login';
import createRouter from './src/auth/controller/create';

const app = express();
app.use(express.json());
app.use(loginRouter);
app.use(createRouter);

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      password: '123321',
    },
  });

  const allUsers = await prisma.user.findMany({

  });

  console.dir(allUsers, { depth: null });
}

main();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
