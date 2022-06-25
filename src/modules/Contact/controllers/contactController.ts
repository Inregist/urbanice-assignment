import { Router, Request } from 'express';
import { ZodError } from 'zod';
import { Contact } from '../../../models/Contact.model';
import { handleCommonControllerError } from '../../../utils/errorHandler';
import { ContactService } from '../services';

const ContactRouter = Router();

ContactRouter.get('/contacts', (_, res) => {
  res.json(ContactService.list());
});

ContactRouter.get('/contacts/:id', (req, res) => {
  try {
    const { id } = req.params;
    res.json(ContactService.findById(id));
  } catch (error) {
    handleCommonControllerError(error, res);
  }
});

ContactRouter.post('/contacts', (req, res) => {
  try {
    res.json(ContactService.create(req.body));
  } catch (error) {
    handleCommonControllerError(error, res);
  }
});

ContactRouter.put('/contacts/:id', (req, res) => {
  try {
    const { id } = req.params;
    res.json(ContactService.update(id, req.body));
  } catch (error) {
    handleCommonControllerError(error, res);
  }
});

ContactRouter.delete('/contacts/:id', (req, res) => {
  try {
    const { id } = req.params;
    res.json(ContactService.delete(id));
  } catch (error) {
    handleCommonControllerError(error, res);
  }
});

export default ContactRouter;
