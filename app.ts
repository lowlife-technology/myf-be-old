import express from 'express';

import AWS from 'aws-sdk';
import loginRouter from './src/identity/controller/login';
import registerRouter from './src/identity/controller/register';
import categoryController from './src/categories/controller';
import sendingEmail from './src/identity/services/sendingEmail';

// TODO: create a file to load and check if credentials are loaded correctly.
AWS.config.getCredentials((err, credentials) => {
  if (err) {
    console.log({ err });
  } else {
    console.log({ credentials });
  }
});

const app = express();
app.use(express.json());
app.use(loginRouter);
app.use(registerRouter);
app.use(categoryController);

app.get('/', async (_, res) => {
  await sendingEmail();

  res.status(200).send({
    message: 'runing!'
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
