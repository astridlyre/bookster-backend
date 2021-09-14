import { seed } from "../db/seed.js";
import { Router } from "express";
import { Book, Review } from "../db/index.js";

const booksRouter = Router();

booksRouter.get("/", async (req, res, next) => {
  try {
    const { q } = req.query;
    const books = await Book.findAll({
      attributes: [
        "id",
        "title",
        "author",
        "image",
        "description",
        "createdAt",
      ],
      include: [{ model: Review, order: ["createdAt", "ASC"] }],
      order: [["id", "ASC"]],
    });
    if (!books) return res.status(404).json({ books: [] });
    if (q)
      return res.json({
        books: books.filter(book =>
          book.title.toLowerCase().includes(q.toLowerCase())
        ),
      });

    return res.json({ books });
  } catch (error) {
    next(error);
  }
});

booksRouter.get("/:id", async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Review,
          order: ["createdAt", "ASC"],
        },
      ],
    });
    if (!book) return res.status(404).json({ book: null });
    return res.json({ book });
  } catch (error) {
    next(error);
  }
});

if (process.env.NODE_ENV !== "production") {
  booksRouter.delete("/", async (req, res, next) => {
    try {
      await seed();
      res.json({ response: "Reset database" });
    } catch (error) {
      next(error);
    }
  });
}

export default booksRouter;
