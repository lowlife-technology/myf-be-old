import express from 'express';
import cors from 'cors';

import { identityRouter } from './Identity';

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

app.get('/', (_, res) => {
  res.status(200).send({
    message: 'working!',
  });
});

app.use(identityRouter);

const PORT = 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}`);
});
