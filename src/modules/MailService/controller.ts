import { Router } from 'express';
import { handleCommonControllerError } from '../../utils/errorHandler';
import { NM_MailService } from './services';

const MailServiceController = Router();

MailServiceController.post('/', async (req, res) => {
  try {
    const result = await NM_MailService.send(req.body);
    res.json(result);
  } catch (error) {
    handleCommonControllerError(error, res);
  }
});

export default MailServiceController;
