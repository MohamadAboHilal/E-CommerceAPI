import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import defineUserModel from "../models/userModel.js";
import defineCategoryModel from "../models/categoryModel.js";
import defineProductModel from "../models/productModel.js";
import defineOrderModel from "../models/orderModel.js";

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
};

db.User = defineUserModel(sequelize);
db.Categories = defineCategoryModel(sequelize);
db.Product = defineProductModel(sequelize);
const { Order, OrderProduct } = defineOrderModel(sequelize);
db.Order = Order;
db.OrderProduct = OrderProduct;

// Define associations
db.Product.belongsTo(db.Categories, { foreignKey: "category_id" });
db.Categories.hasMany(db.Product, { foreignKey: "category_id" });

const Product = db.Product;

export { db, Order, OrderProduct, Product };

export default db;
