import express from 'express';

import loginRouter from './src/auth/controller/login';
import createRouter from './src/auth/controller/create';

const app = express();
app.use(express.json());
app.use(loginRouter);
app.use(createRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
