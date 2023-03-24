// Dependencies
import { Sequelize } from "sequelize";

// Configuration
import { $db } from "../../config";

// Interfaces
import { IModels } from "../types";

// Database connection
const { dialect, host, port, database, username, password } = $db;

// Connectiong to the database
const uri = `${dialect}://${username}:${password}@${host}:${port}/${database}`;
const sequelize = new Sequelize(uri);

// Models
const models: IModels = {
  User: require("./User").default(sequelize, Sequelize),
  sequelize,
};

export default models;
