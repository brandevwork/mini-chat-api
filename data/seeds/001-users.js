exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "menadio",
          email: "menadio@email.com",
          password: "password",
        },
      ]);
    });
};

