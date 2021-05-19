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
    database:
      process.env.TODO_ENV === 'test' ? process.env.TEST_DATABASE_NAME : process.env.DATABASE_NAME,
    entities,
    ...(process.env.TODO_ENV !== 'test' && { migrations }),
    migrationsRun: process.env.TODO_ENV !== 'test',
    synchronize: process.env.TODO_ENV === 'test',
    dropSchema: process.env.TODO_ENV === 'test',
  };
  return config;
};

module.exports = ormConfig();
