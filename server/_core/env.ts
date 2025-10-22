import "dotenv/config";

export const ENV = {
  port: parseInt(process.env.PORT || "3001"),
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || "default-jwt-secret",
  ownerId: process.env.OWNER_ID || "admin",
};

