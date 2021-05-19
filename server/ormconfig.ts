require('dotenv').config();

const entities = [
  `${__dirname}/src/database/entities/*.ts`,
  `${__dirname}/src/database/entities/*.js`,
];

const migrations = [
  `${__dirname}/src/database/migrations/*.ts`,
  `${__dirname}/src/database/migrations/*.js`,
];

const ormConfig = () => {
  const config = {
    type: process.env.DATABASE_TYPE as any,
    host: process.env.DATABASE_HOST,
    port: +(process.env.DATABASE_PORT as any),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities,
    migrations,
    migrationsRun: process.env.DCS_ENV !== 'test',
    cli: {
      migrationsDir: `src/database/migrations`,
    },
    synchronize: process.env.DCS_ENV === 'test',
    dropSchema: process.env.DCS_ENV === 'test',
  };
  return config;
};

module.exports = ormConfig();
