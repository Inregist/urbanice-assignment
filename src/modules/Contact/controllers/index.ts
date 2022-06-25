import { Router } from 'express';
import ContactRouter from './contactController';

const ContactController = Router();

ContactController.use('/', ContactRouter);

export default ContactController;
