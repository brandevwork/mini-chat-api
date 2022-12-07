export {};
import { IUser } from "../../interfaces/users";
import { Request, Response, NextFunction } from 'express';

const express = require("express");
const bcrypt = require("bcrypt");

const dbUser = require("./userDB");

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", validateUserId, getUserById);
userRouter.delete("/:id", validateUserId, deleteUser);
userRouter.put("/:id", validateUserId, editUser);

function editUser(req: any, res: any)  {

  dbUser
    .update(req.user.id, req.body)
    .then(() => {
      res.status(200).json({ ...req.user, ...req.body });
    })
    .catch((error: Error) => {
      res.status(500).json({
        message: "Could not Update User" + error,
      });
    });
}

function getAllUsers(req: Request, res: Response)  {
  dbUser
    .get()
    .then((user: IUser) => {
      res.status(200).json(user);
    })
    .catch((error: Error) => {
      res.status(500).json({
        message: "Error adding new user" + error.message,
      });
    });
}

function getUserById(req: any, res: Response)  {
  res.json(req.user);
}


function deleteUser(req: any, res: Response) {
  dbUser.remove(req.user.id).then(() => {
    res
      .status(200)
      .json({ message: "User deleted successfully", deletedUser: req.user });
  });
}

// Middleware
function validateUserId(req: any, res: Response, next: NextFunction) {
  const id = req.params.id;
  dbUser
    .getById(id)
    .then((user: IUser) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({
          message: "User id does not corresspond with an existing user",
        });
      }
    })
    .catch((error: Error) => {
      res.status(404).json({ message: " Invalid user id:" + error.message });
    });
}

module.exports = userRouter;