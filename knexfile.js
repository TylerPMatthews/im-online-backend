require("dotenv").config();

const pg = require("pg");
const localConnection = "postgresql://localhost/imonline";
let connection;

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false };
  connection = process.env.DATABASE_URL;
} else {
  connection = localConnection;
}

const sharedConfig = {
  client: "pg",
  migrations: { directory: "./api/data/migrations" },
  seeds: { directory: "./api/data/seeds" },
};

module.exports = {
  development: {
    ...sharedConfig,
    connection: process.env.DEV_DATABASE_URL,
  },
  testing: {
    ...sharedConfig,
    connection: process.env.TESTING_DATABASE_URL,
  },
  production: {
    ...sharedConfig,
    connection: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    pool: { min: 2, max: 10 },
  },
};
