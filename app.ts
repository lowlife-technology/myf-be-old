import express from 'express';

import cors from 'cors';
// import AWS from 'aws-sdk';
import loginRouter from './src/Identity/controller/login';
import registerRouter from './src/Identity/controller/register';
import categoryController from './src/Categories/controller';
import sendEmailToken from './src/Identity/controller/sendEmailToken';
import verifyEmail from './src/Identity/controller/verifyEmail';
import { balanceRouter } from './src/Balance';
import balance from './src/Balance/controller';

// TODO: create a file to load and check if credentials are loaded correctly.
// AWS.config.getCredentials((err, credentials) => {
//   if (err) {
//     console.log({ err });
//   } else {
//     console.log({ credentials });
//   }
// });

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

app.use(loginRouter);
app.use(registerRouter);
app.use(categoryController);
app.use(sendEmailToken);
app.use(verifyEmail);
app.use(balance);
app.use(balanceRouter);

app.get('/', (_, res) => {
  res.status(200).send({
    message: 'runing!',
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
