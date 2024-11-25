import express from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import urlRouter from "./routes/urlRoutes.js";
import { sequelize } from "./sequelize.js";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

// Logging Middleware
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// Routes
app.use("/", urlRouter);

// Start Server and Sync Database
sequelize.sync({ force: false }).then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
