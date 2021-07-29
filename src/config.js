module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET || "black-jack-saloon",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://Metta@localhost/blackjack-saloon",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://Metta@localhost/blackjack-saloon",
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:3000",
};
