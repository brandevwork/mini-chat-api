/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const up = function(knex) {
  return knex.schema.createTable('users', (users) => {
    users.increments();
    users.string('username').notNullable().unique();
    users.string('email').notNullable().unique();
    users.string('password').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};

export { up, down }
 