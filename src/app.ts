import express from 'express';
import helmet from 'helmet';
import config from './config/config';
import TaxController from './modules/TaxCalculator/controller';

const app = express();

app.use(helmet());
app.use(express.json());

app.use('/tax', TaxController);

app.listen(config.port, () => {
  console.log(`app is running on port ${4000}`);
});
