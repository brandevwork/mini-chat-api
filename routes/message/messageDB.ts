import { IMessage } from "../../interfaces/messages";

export {};
const db = require("../../data/dbConfig.js");

module.exports = {
  getAllMessages,
  getMessagesBy,
  getMessageById,
  sendMessage,
  remove,
};

function getAllMessages() {
  return db("messages");
}
function getMessagesBy(filter: any) {
  return db("messages").where(filter);
}

function getMessageById(id: number) {
  return db("messages").where({ id }).first();
}

function sendMessage(message: IMessage) {
  return db("messages")
    .insert(message)
    .then((id: any) => {
      return getMessageById(id[0]);
    });
}

function remove(id: number) {
  return db("messages").where("id", id).del();
}
