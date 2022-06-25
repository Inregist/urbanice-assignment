import { Router } from 'express';
import { handleCommonControllerError } from '../../../utils/errorHandler';
import { ContactService } from '../services';

const ContactRouter = Router();

ContactRouter.get('/contacts', (_, res) => {
  res.json(ContactService.list());
});

ContactRouter.get('/contacts/:id', (req, res) => {
  try {
    const { id } = req.params;
    const contact = ContactService.findById(id);

    if (contact) res.json(contact);
    else res.status(404).json({ error: `contact not found` });
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

ContactRouter.patch('/contacts/:id', (req, res) => {
  try {
    const { id } = req.params;
    const contact = ContactService.update(id, req.body);

    if (contact) res.json(contact);
    else res.status(404).json({ error: `contact not found` });
  } catch (error) {
    handleCommonControllerError(error, res);
  }
});

ContactRouter.delete('/contacts/:id', (req, res) => {
  try {
    const { id } = req.params;
    const contactId = ContactService.delete(id);

    if (contactId) res.json({ id: contactId });
    else res.status(404).json({ error: `contact not found` });
  } catch (error) {
    handleCommonControllerError(error, res);
  }
});

export default ContactRouter;
