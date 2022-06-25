import { Router } from 'express';
import { handleCommonControllerError } from '../../utils/errorHandler';
import { MailService } from './services';

const MailServiceController = Router();

MailServiceController.post('/', async (req, res) => {
  try {
    await MailService.send(req.body);
    res.json({ message: 'message has been sent' });
  } catch (error) {
    handleCommonControllerError(error, res);
  }
});

export default MailServiceController;
