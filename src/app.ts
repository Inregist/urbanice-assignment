import express from 'express';
import helmet from 'helmet';
import config from './config/config';

const app = express();

app.use(helmet());
app.use(express.json());

app.listen(config.port, () => {
  console.log(`app is running on port ${4000}`);
});
