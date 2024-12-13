// environment level constants

import dotEnv from 'dotenv';

dotEnv.config();

const env = process.env;

export const PORT = Number(env.PORT);

export const NODE_ENV = env.NODE_ENV;

export const DATABASE_SETTINGS = {
  URL: env.DATABASE_URL,
};

export const EMAIL_SETTINGS = {
  SERVICE_PROVIDER: 'gmail',
  USER_ID: env.EMAIL_USER_ID,
  PASSWORD: env.EMAIL_PASSWORD,
};
