import db from "./db.js";
import Book from "./models/Book.js";
import Review from "./models/Review.js";

Book.hasMany(Review);
Review.belongsTo(Book);

export { db, Book, Review };
