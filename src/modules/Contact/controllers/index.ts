import { Router } from 'express';
import ContactRouter from './contactController';
import ContactGroupRouter from './contactGroupController';
import GroupRouter from './groupController';

const ContactController = Router();

ContactController.use('/', ContactRouter, GroupRouter, ContactGroupRouter);

export default ContactController;
