const db = require("../../data/dbConfig.js");

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};

function get() {
  return db("users").select("id", "username", "email");
}

function getById(id: any) {
  return db("users").select("id", "username", "email").where({ id }).first();
}

function create(user: any) {
  return db("users")
    .insert(user)
    .then((id: any) => {
      return getById(id[0]);
    });
}

function update(id: any, changes: any) {
  return db("users")
    .where({ id })
    .update(changes)
    .then((id: any) => {
      return getById(id);
    });
}

function remove(id: any) {
  return db("users").where("id", id).del();
}
