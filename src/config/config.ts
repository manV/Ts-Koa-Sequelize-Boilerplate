import { ISequelizeConfig } from 'sequelize-typescript';

const config: {
  [index: string]: ISequelizeConfig,
} = {
  development: {
    username: 'postgres',
    password: 'password',
    database: 'sequelize_typescript',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: 'root',
    password: '',
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: '',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};

export default config;