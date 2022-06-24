import { Router } from 'express';
import { TagService } from './services';
import zod from 'zod';

const TaxController = Router();

TaxController.get('/calculate', (req, res) => {
  const { netIncome } = req.body;
  if (zod.number().safeParse(netIncome).success === false)
    res.status(400).send('netIncome must be a number');

  res.json({ tax: TagService.calculateTax(netIncome) });
});

export default TaxController;
