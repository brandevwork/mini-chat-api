const cleaner = require('knex-cleaner');

exports.seed = function (knex) {
  return cleaner.clean(knex, {
    mode: "truncate", // This resets all ids
    ignoreTables: ["knex_migrations", "knex_migrations_lock"], // do not empty migration tables
  });
};

