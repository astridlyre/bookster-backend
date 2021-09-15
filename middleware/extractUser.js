import jwt from "jsonwebtoken";
import { User } from "../db/index.js";

export function extractUser(req, res, next) {
  const token = req.headers["x-access-token"];
  if (token) {
    return jwt.verify(
      token,
      process.env.SESSION_SECRET,
      (error, decodedToken) => {
        if (error) return next();

        User.findOne({ where: { id: decodedToken.id } }).then(user => {
          req.user = user;
          return next();
        });
      }
    );
  }
  return next();
}
