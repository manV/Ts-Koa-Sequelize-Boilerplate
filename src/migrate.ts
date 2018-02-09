import sequelize from './sequelize';
import * as Umzug from 'umzug';
import * as path from 'path';
import * as childProcess from 'child_process';
import { ISequelizeConfig } from 'sequelize-typescript';
import config from './config/config';
const env: string = process.env.NODE_ENV || 'development';
const cfg: ISequelizeConfig = config[env];

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: { sequelize },
  migrations: {
    params: [
      sequelize,
      sequelize.constructor,
      function() {
        throw new Error(
          'Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.'
        );
      }
    ],
    path: path.resolve(__dirname, 'migrations'),
    pattern: /\.js$/
  },
  logging: () => {
    console.log.apply(null, arguments);
  }
});

const logUmzugEvent = (eventName: string) => {
  return (name: string) => {
    console.log(`${name} ${eventName}`);
  };
};

umzug.on('migrating', logUmzugEvent('migrating'));
umzug.on('migrated', logUmzugEvent('migrated'));
umzug.on('reverting', logUmzugEvent('reverting'));
umzug.on('reverted', logUmzugEvent('reverted'));

const cmdStatus = async () => {
  const executed = await umzug.executed();
  const pending = await umzug.pending();
  
  const current = executed.length > 0 ? executed[0].file : '<NO_MIGRATIONS>';
  const status = {
    current: current,
    executed: executed.map(m => m.file),
    pending: pending.map(m => m.file)
  };
  return { executed, pending };
};

const cmdMigrate = async () => {
  await umzug.up();
};

const cmdMigrateNext = async () => {
  const { executed, pending  } = await cmdStatus();
  if (pending.length === 0) {
    throw new Error('No pending migrations');
  }
  const next = pending[0].file;
  await umzug.up({ to: next });
};

const cmdResetPrev = async () => {
  const { executed, pending  } = await cmdStatus();
  if (executed.length === 0) {
    throw new Error('Already at initial state');
  }
  const prev = executed[executed.length - 1].file;
  await umzug.down({ to: prev });
};

const cmd = process.argv[2].trim();
let executedCmd: Promise<any>;

console.log(`${cmd.toUpperCase()} BEGIN`);

switch (cmd) {
  case 'status':
    executedCmd = cmdStatus();
    break;
  case 'up':
  case 'migrate':
    executedCmd = cmdMigrate();
    break;
  case 'next':
  case 'migrate-next':
    executedCmd = cmdMigrateNext();
    break;
  case 'prev':
  case 'reset-prev':
    executedCmd = cmdResetPrev();
    break;
  default:
    console.log(`invalid cmd: ${cmd}`);
    executedCmd = Promise.reject(new Error());
    process.exit(1);
}

executedCmd
  .then(result => {
    const doneStr = `${cmd.toUpperCase()} DONE`;
    console.log(doneStr);
    console.log(
      '=============================================================================='
    );
  })
  .catch(err => {
    const errorStr = `${cmd.toUpperCase()} ERROR`;
    console.log(errorStr);
    console.log(
      '=============================================================================='
    );
    console.log(err);
    console.log(
      '=============================================================================='
    );
  })
  .then((result): Promise<any> => {
    if (cmd !== 'status' && cmd !== 'reset-hard') {
      return cmdStatus();
    }
    return Promise.resolve();
  })
  .then(() => process.exit(0));
