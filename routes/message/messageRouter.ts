import { IMessage } from "../../interfaces/messages";
import { Request, Response, NextFunction } from "express";

export {};
const express = require("express");
const bcrypt = require("bcrypt");

const dbMessage = require("./messageDB");

const messageRouter = express.Router();

messageRouter.get("/", getAllMessages);
messageRouter.post("/room", getMessageByRoomName);
messageRouter.post("/user", getMessageByUserName);
messageRouter.post("/new-message", sendMessage);
messageRouter.get("/message/:id", validateMessageId, getMessageById);

function sendMessage(req: any, res: Response) {
  dbMessage
    .sendMessage(req.body)
    .then((message: IMessage) => {
      res.status(200).json(message);
    })
    .catch((error: any) => {
      res.status(500).json(error.message);
    });
}

function getAllMessages(req: Request, res: Response)  {
  dbMessage
    .getAllMessages()
    .then((message: IMessage) => {
      res.status(200).json(message);
    })
    .catch((error: Error) => {
      res.status(500).json({
        message: "Error getting messages" + error.message,
      });
    });
}

function getMessageById(req: any, res: Response) {
  res.json(req.message);
}

function getMessageByRoomName(req: any, res: Response) {
  const { room } = req.body;
  dbMessage
    .getMessagesBy({ room })
    .then((message: IMessage) => {
      res.status(200).json(message);
    })
    .catch((error: Error) => {
      res.status(500).json(error.message);
    });
}

function getMessageByUserName(req: any, res: Response) {
  const { username } = req.body;
  dbMessage
    .getMessagesBy({ username })
    .then((message: IMessage) => {
      res.status(200).json(message);
    })
    .catch((error: any) => {
      res.status(500).json(error.message);
    });
}

function validateMessageId(req: any, res: Response, next: NextFunction) {
  const id = req.params.id;
  dbMessage
    .getMessageById(id)
    .then((message: IMessage) => {
      if (message) {
        req.message = message;
        next();
      } else {
        res.status(404).json({
          message: "Message id does not corresspond with an existing message",
        });
      }
    })
    .catch((error: Error) => {
      res.status(404).json({ message: " Invalid message id:" + error.message });
    });
}

module.exports = messageRouter;
