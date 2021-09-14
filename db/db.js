import seq from "sequelize";

const db = new seq.Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/booklist",
  {
    logging: false,
  }
);

export default db;
