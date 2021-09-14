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
    const { name, content, bookId } = req.body;
    if (!name || !content || !bookId) {
      return res
        .status(400)
        .json({ error: "Name, content and bookId are required" });
    }
    const review = await Review.create({
      name,
      content,
      bookId,
    });
    return res.status(203).json({ review });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default reviewsRouter;
