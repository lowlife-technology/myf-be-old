import express from 'express';

import loginRouter from './src/identity/controller/login';
import registerRouter from './src/identity/controller/register';
import categoryController from './src/categories/controller';

const app = express();
app.use(express.json());
app.use(loginRouter);
app.use(registerRouter);
app.use(categoryController);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
