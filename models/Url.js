import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";


export const Url = sequelize.define('Url', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    originalUrl: DataTypes.STRING,
    shortId: DataTypes.STRING,
    expiry: DataTypes.DATE
});