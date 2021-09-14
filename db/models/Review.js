import seq from "sequelize";
import db from "../db.js";

const Review = db.define("review", {
  name: {
    type: seq.DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: seq.DataTypes.TEXT,
    allowNull: false,
  },
});

export default Review;
