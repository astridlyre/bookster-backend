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

export default reviewsRouter;
