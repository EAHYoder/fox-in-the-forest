import { Sequelize } from 'sequelize';

const pkg = require("../../package.json");//keeping this as require syntax because I don't know how to modify the package to export default syntax.  Therefore I cannot access the package without this syntax.  I could get around this by hardcoding the name of the local db.

const databaseName = pkg.name;

const config = {
  logging: false,
};

if (process.env.LOGGING === "true") {
  delete config.logging;
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  config
);
export default db;
