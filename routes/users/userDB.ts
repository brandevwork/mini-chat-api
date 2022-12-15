import { IUser } from "../../interfaces/users";

export {};
const db = require("../../data/dbConfig.js");

module.exports = {
  get,
  getBy,
  getById,
  create,
  update,
  remove,
};

function get() {
  return db("users").select("id", "username", "email");
}
function getBy(filter: any) {
  return db("users").where(filter);
}

function getById(id: number) {
  return db("users").select("id", "username", "email").where({ id }).first();
}

function create(user: IUser) {
  return db("users")
    .insert(user)
}

function update(id: number, changes: IUser) {
  return db("users")
    .where({ id })
    .update(changes)
    .then((id: number) => {
      return getById(id);
    });
}

function remove(id: number) {
  return db("users").where("id", id).del();
}
