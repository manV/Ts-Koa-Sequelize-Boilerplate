import { Sequelize, ISequelizeConfig } from 'sequelize-typescript';

import config from "./config/config";
const cfg: ISequelizeConfig = config;
cfg.modelPaths = [__dirname + '/models']

export default new Sequelize(cfg);