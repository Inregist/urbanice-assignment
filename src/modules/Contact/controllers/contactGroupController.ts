import { Router } from 'express';
import { handleCommonControllerError } from '../../../utils/errorHandler';
import { ContactGroupService } from '../services';

const ContactGroupRouter = Router();

ContactGroupRouter.get('/contact-groups', (_, res) => {
  try {
    res.json(ContactGroupService.list());
  } catch (error) {
    handleCommonControllerError(error, res);
  }
});

ContactGroupRouter.get('/contact-groups/:id', (req, res) => {
  try {
    const { id } = req.params;
    const contacts = ContactGroupService.listByGroup(id);

    if (contacts) res.json(contacts);
    else res.status(404).json({ error: `contact group not found` });
  } catch (error) {
    handleCommonControllerError(error, res);
  }
});

export default ContactGroupRouter;
