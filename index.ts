import express from 'express';

import loginRouter from './src/identity/controller/login';
import createRouter from './src/identity/controller/register';

const app = express();
app.use(express.json());
app.use(loginRouter);
app.use(createRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
