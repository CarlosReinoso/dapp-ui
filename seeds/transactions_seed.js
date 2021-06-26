const transactionsData = require("../seed_data/transactions");

exports.seed = function (knex) {
  return knex("transactions")
    .del()
    .then(function () {
      return knex("transactions").insert(transactionsData);
    });
};
