import { Router } from "express";
import { User } from "../db/index.js";
import jwt from "jsonwebtoken";

function createToken(user) {
  return jwt.sign({ id: user.dataValues.id }, process.env.SESSION_SECRET, {
    expiresIn: ONE_DAY,
  });
}

const ONE_DAY = 86400;
const usersRouter = Router();

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ error: "Username, password and email are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const newUser = await User.create({
      username,
      password,
      email,
    });

    const token = createToken(newUser);

    return res.json({
      user: newUser.dataValues,
      token,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(401).json({ error: "Username/email already exists" });
    } else if (error.name === "SequelizeValidationError") {
      return res.status(401).json({ error: "Validation error" });
    } else next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      console.log({ error: `No user found for username: ${username}` });
      return res.status(401).json({ error: "Wrong username and/or password" });
    }

    if (!user.correctPassword(password)) {
      console.log({ error: `Wrong username and/or password for: ${username}` });
      return res.status(401).json({ error: "Wrong username and/or password" });
    }

    const token = createToken(user);
    return res.json({
      user: user.dataValues,
      token,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.delete("/logout", (req, res, next) => {
  res.sendStatus(204);
});

usersRouter.get("/profile", (req, res, next) => {
  if (req.user) {
    return res.json({
      user: req.user,
    });
  }
  return res.json({ error: "Not found" });
});

export default usersRouter;
