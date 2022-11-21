const express = require("express");

const dbUser = require("./userDB");

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", validateUserId, getUserById);
userRouter.post("/", createUser);
userRouter.delete("/:id", validateUserId, deleteUser);
userRouter.put("/:id", validateUserId, editUser);

function editUser(req: any, res: any) {
  dbUser
    .update(req.user.id, req.body)
    .then(() => {
      res.status(200).json({ ...req.user, ...req.body });
    })
    .catch((error: any) => {
      res.status(500).json({
        message: "Could not Update User" + error,
      });
    });
    // getUserById(req, res)
}

function getAllUsers(req: any, res: any) {
  dbUser
    .get()
    .then((user: any) => {
      res.status(201).json(user);
    })
    .catch((error: any) => {
      res.status(500).json({
        message: "Error adding new user" + error.message,
      });
    });
}

function getUserById(req: any, res: any) {
  res.json(req.user);
}

function createUser(req: any, res: any) {
  dbUser
    .create(req.body)
    .then((user: any) => {
      res.status(201).json(user);
    })
    .catch((error: any) => {
      res.status(500).json({
        message: "Error adding the new user: " + error.message,
      });
    });
}

function deleteUser(req: any, res: any) {
  dbUser.remove(req.user.id).then(() => {
    res
      .status(200)
      .json({ message: "User deleted successfully", deletedUser: req.user });
  });
}

// Middleware

function validateUserId(req: any, res: any, next: any) {
  const id = req.params.id;
  dbUser
    .getById(id)
    .then((user: any) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({
          message: "User id does not corresspond with an existing user",
        });
      }
    })
    .catch((error: any) => {
      res.status(404).json({ message: " Invalid user id:" + error.message });
    });
}

module.exports = userRouter;
