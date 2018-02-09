import { Sequelize, ISequelizeConfig } from 'sequelize-typescript';

import config from "./config/config";
const cfg: ISequelizeConfig = config[process.env.NODE_ENV || 'development'];
cfg.modelPaths = [__dirname + '/models']

export default new Sequelize(cfg);