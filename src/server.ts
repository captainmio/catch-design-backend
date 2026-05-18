import dotenv from "dotenv";
import express from "express";

import customerRoutes from "./routes/customer.routes";

import { errorMiddleware } from "./middleware/error.middleware";
import { notFoundMiddleware } from "./middleware/not-found.middleware";

dotenv.config();

import { AppDataSource } from "./config/data-source";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    const app = express();
    await AppDataSource.initialize();

    console.log("Database connected");

    app.use("/customers", customerRoutes);

    app.use(notFoundMiddleware);
    app.use(errorMiddleware);

    app.use(express.json());

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

bootstrap();