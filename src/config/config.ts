import { ISequelizeConfig } from 'sequelize-typescript';

const config: ISequelizeConfig = {
  username: process.env.DB_USERNAME || 'testuser',
  password: process.env.DB_PASSWORD || 'testpassword',
  database: process.env.DB_NAME || 'pstestdb',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  logging: Boolean(process.env.DB_LOGGING)
};
console.log(config);
export default config;