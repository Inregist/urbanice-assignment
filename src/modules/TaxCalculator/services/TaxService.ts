import { K, M } from '../../../utils/constants';

const progressiveTaxRate = [
  {
    range: 5 * M,
    taxFlat: 1265 * K,
    taxPercent: 0.35,
  },
  {
    range: 2 * M,
    taxFlat: 365 * K,
    taxPercent: 0.3,
  },
  {
    range: 1 * M,
    taxFlat: 115 * K,
    taxPercent: 0.25,
  },
  {
    range: 750 * K,
    taxFlat: 65 * K,
    taxPercent: 0.2,
  },
  {
    range: 500 * K,
    taxFlat: 27500,
    taxPercent: 0.15,
  },
  {
    range: 300 * K,
    taxFlat: 7500,
    taxPercent: 0.1,
  },
  {
    range: 150 * K,
    taxFlat: 0,
    taxPercent: 0.5,
  },
];

const TagService = {
  calculateTax: (netIncome: number): number => {
    for (let { range, taxFlat, taxPercent } of progressiveTaxRate) {
      if (netIncome > range) {
        return (netIncome - range) * taxPercent + taxFlat;
      }
    }
    return 0;
  },
};

export default TagService;
