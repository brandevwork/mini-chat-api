export {};
import { IUser } from "../../interfaces/users";
import { Request, Response, NextFunction } from 'express';

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dbUser = require("./../users/userDB");

const authRouter = express.Router();

authRouter.post("/register", createUser);
authRouter.post("/login", login);

function createUser(req: Request, res: Response) {
  const userDetails = req.body;
  const hash = bcrypt.hashSync(userDetails.password, 6);
  userDetails.password = hash;
  dbUser
    .create(userDetails)
    .then((user: IUser) => {
      const token = generateToken(user);
      res.status(201).json({ user, token });
    })
    .catch((error: Error) => {
      res.status(500).json({
        message: "Error adding the new user: " + error.message,
      });
    });
}

function login(req: Request, res: Response) {
  const { username, password } = req.body;
  dbUser
    .getBy({ username })
    .first()
    .then((user: IUser) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: "Login Successful!",
          token: token,
        });
      } else {
        res.status(401).json({ message: " Invalid Credentials" });
      }
    })
    .catch((error: Error) => {
      res.status(500).json(error.message);
    });
}

function generateToken(user: IUser) {
  const payload = {
    id: user.id,
    username: user.username,
    roles: ["users"],
  };
  const options = {
    expiresIn: "1d",
  };

  const result = jwt.sign(
    payload,
    process.env.SECRET || "SomeSecretText",
    options
  );
  return result;
}

module.exports = authRouter;
