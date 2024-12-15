require("dotenv").config();
const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/dbConn");
const rateLimiter = require("./middleware/rateLimiter");
const { authRoutes, managerRoutes } = require("./routes");
const { loadRoutes } = require("./utils");
const swaggerConfig = require("./config/swaggerConfig");

// Enable Helmet for all routes
app.use(helmet());


// Enable rate limiting for all routes
// app.use(rateLimiter);

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
connectDB();

// middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// middleware for json
app.use(express.json());

// Define routes
const routes = [
  { path: "/api/v1/auth", route: authRoutes },
  { path: "/api/v1/manager", route: managerRoutes },
];

// Load all routes
loadRoutes(app, routes);

// Swagger route
app.use("/api-docs", swaggerConfig.serve, swaggerConfig.setup);

// Graceful shutdown handlers
process.on("SIGINT", async () => {
  console.log("\nGracefully shutting down...");
  await mongoose.connection.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\nGracefully shutting down...");
  await mongoose.connection.close();
  process.exit(0);
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger Docs at http://localhost:${PORT}/api-docs`);
  });
});
