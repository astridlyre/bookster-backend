import seq from "sequelize";
import db from "../db.js";

const Book = db.define("book", {
  title: {
    type: seq.DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: seq.DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: seq.DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: seq.DataTypes.TEXT,
    allowNull: false,
  },
});

export default Book;
