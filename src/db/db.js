import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import defineUserModel from "../models/userModel.js";

dotenv.config();

const NEON = process.env.NEON;
const sequelize = new Sequelize(NEON, {
  dialect: "postgres",
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

const db = {
  sequelize,
  Sequelize,
  User: defineUserModel(sequelize),
};

export default db;
