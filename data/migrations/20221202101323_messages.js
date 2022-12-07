/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("messages", (messages) => {
    messages.increments();
    messages
      .string("username")
      .notNullable()
      .references("username")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    messages.string("message").notNullable();
    messages.string("room").notNullable();
    messages.timestamp("__createdtime__").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("messages");
};
