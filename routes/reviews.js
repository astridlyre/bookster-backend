import { Router } from "express";
import { Review } from "../db/index.js";

const reviewsRouter = Router();

reviewsRouter.get("/:id", async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) res.status(404).json({ review: null });
    res.json({ review });
  } catch (error) {
    next(error);
  }
});

reviewsRouter.post("/create", async (req, res, next) => {
  try {
    const { id, username } = req.user;
    if (!id || !username)
      return res.status(401).json({ error: "Not logged in" });

    const { content, bookId } = req.body;
    if (!content || !bookId) {
      return res.status(400).json({ error: "Content and bookId are required" });
    }

    const review = await Review.create({
      content,
      bookId,
      userId: id,
      name: username,
    });

    return res.status(203).json({ review });
  } catch (error) {
    next(error);
  }
});

export default reviewsRouter;
