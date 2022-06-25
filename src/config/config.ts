import dotenv from 'dotenv';
dotenv.config();

const resolveBoolean = (value?: string, defaultValue?: boolean) => {
  if (!value) return defaultValue;

  const lv = value.toLowerCase();
  if (lv === 'true') return true;
  return false;
};

export default {
  port: process.env.PORT ?? 4500,
  mockContact: resolveBoolean(process.env.MOCK_CONTACT, false),
};
