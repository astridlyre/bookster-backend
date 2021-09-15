import db from "./db.js";
import Book from "./models/Book.js";
import Review from "./models/Review.js";
import User from "./models/User.js";

Book.hasMany(Review);
User.hasMany(Review);
Review.belongsTo(Book);
Review.belongsTo(User);

export { db, Book, Review, User };
