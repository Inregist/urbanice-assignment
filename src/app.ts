import express from 'express';
import helmet from 'helmet';
import config from './config/config';
import ContactController from './modules/Contact/controllers';
import TaxController from './modules/TaxCalculator/controller';
import ContactMocker from './utils/contactMocker';

const app = express();

app.use(helmet());
app.use(express.json());

if (config.mockContact) {
  console.log('mocking groups...');
  ContactMocker.mockGroups();
  console.log('mocking contacts...');
  ContactMocker.mockContacts();
  console.log('done');
}

app.use('/tax', TaxController);
app.use('/contact-api', ContactController);

app.listen(config.port, () => {
  console.log(`app is running on port ${4000}`);
});
