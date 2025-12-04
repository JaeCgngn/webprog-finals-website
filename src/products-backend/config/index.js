import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  mongodbUri: process.env.MONGODB_URI,
  mongodbName: process.env.MONGODB_NAME || "UnPause-Store"
};

export default config;
