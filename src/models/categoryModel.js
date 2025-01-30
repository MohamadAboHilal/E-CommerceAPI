import { DataTypes } from "sequelize";

const defineCategoryModel = (sequelize) => {
  return sequelize.define(
    "category",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "categories",
      timestamps: false,
    }
  );
};

export default defineCategoryModel;
