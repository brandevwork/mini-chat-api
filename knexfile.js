/* eslint-disable no-undef */

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      host : process.env.DATABASE_URL, // should be remote host
      user : 'root',
      password : 'your_database_password',
      database : 'chatappdb'
    },
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations",
    },
    seeds: { directory: "./data/seeds" }
  },
  production: {
    client: "pg",
    connection: { // MOVE TO ENV. VARS
      host : 'batyr.db.elephantsql.com', // should be remote host
      user : 'kgdgfacj',
      password : 'tcBjZGa0R6DM_3S57_hvrJ_Pa1uwbrGm',
      database : 'kgdgfacj'
    },
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations",
    },
    seeds: { directory: "./data/seeds" }
  }
};
