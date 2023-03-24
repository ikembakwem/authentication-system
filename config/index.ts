// Dependencies
import dotenv from "dotenv";

// Configuration
import config from "./config.json";

// Loading environment variables
dotenv.config();

// Types
type Database = {
  dialect: string;
  port: string;
  host: string;
  database: string;
  username: string;
  password: string;
};

type Security = {
  secretKey: string;
  expiresIn: string;
};

type Server = {
  port: number;
};

// Extracting data from .env file
const {
  DB_DIALECT = "",
  DB_HOST = "",
  DB_PORT = "",
  DB_DATABASE = "",
  DB_USERNAME = "",
  DB_PASSWORD = "",
} = process.env;

const database: Database = {
  dialect: DB_DIALECT,
  port: DB_PORT,
  host: DB_HOST,
  database: DB_DATABASE,
  username: DB_USERNAME,
  password: DB_PASSWORD,
};

// Configuration
const { security, server } = config;

export const $db: Database = database;
export const $security: Security = security;
export const $server: Server = server;
