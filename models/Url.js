import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";

export const URL = sequelize.define("URL", {
  longUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
