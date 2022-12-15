exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "menadio",
          email: "menadio@email.com",
          password: "password",
        },
      ]);
    });
};

