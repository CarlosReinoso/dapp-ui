exports.up = function (knex) {
  return knex.schema.createTable("transactions", (table) => {
    table.increments("id").primary();
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.string("base_coin").notNullable().defaultTo("Bitcoin");
    table.string("swap_coin").notNullable();
    table.float("base_input", 14,8).notNullable();
    table.float("swap_input", 14,8).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("transactions");
};
