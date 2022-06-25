import { Router } from 'express';
import ContactRouter from './contactController';
import GroupRouter from './groupController';

const ContactController = Router();

ContactController.use('/', ContactRouter, GroupRouter);

export default ContactController;
