import express from 'express';

import loginRouter from './src/identity/controller/login';
import registerRouter from './src/identity/controller/register';
import categoryController from './src/categories/controller';

const app = express();
app.use(express.json());
app.use(loginRouter);
app.use(registerRouter);
app.use(categoryController);

app.get('/', (_, res) => {
  res.status(200).send({
    message: 'runing!',
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
