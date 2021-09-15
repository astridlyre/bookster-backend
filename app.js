import { config } from "dotenv";
config();

import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { db } from "./db/index.js";
import { unknownEndpoint } from "./middleware/unknownEndpoint.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { limiter } from "./middleware/rateLimiter.js";
import { extractUser } from "./middleware/extractUser.js";
import pingRouter from "./routes/ping.js";
import usersRouter from "./routes/users.js";
import booksRouter from "./routes/books.js";
import reviewsRouter from "./routes/reviews.js";

const app = express();

if (!process.env.NODE_ENV === "test") {
  app.use(limiter);
}

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(extractUser);

app.use("/api/ping", pingRouter);
app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);
app.use("/api/reviews", reviewsRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

db.sync().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}`)
  );
});

export default app;
