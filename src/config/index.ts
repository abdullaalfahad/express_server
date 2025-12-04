import dotenv from 'dotenv';

dotenv.config();

export const config = {
  connectionString: process.env.CONNECTION_STRING,
  port: process.env.PORT,
};
