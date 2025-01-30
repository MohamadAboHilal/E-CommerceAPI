import { DataTypes } from "sequelize";
import db from "../db/db.js";

const Product = db.sequelize.define(
  "Product",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    image_url: { type: DataTypes.STRING, validate: { isUrl: true } },
    stock: { type: DataTypes.INTEGER, defaultValue: 0, validate: { min: 0 } },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);
// Product.belongsTo(Category, {
//   foreignKey: "category_id",
//   onDelete: "SET NULL",
// });

export default Product;
