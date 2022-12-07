const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from 'express';

module.exports = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(
      token,
      process.env.SECRET || "SomeSecretText",
      (error: Error, decodedToken: any) => {
        if (error) {
          res.status(401).json({ message: "unauthorized" });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      }
    );
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
};
