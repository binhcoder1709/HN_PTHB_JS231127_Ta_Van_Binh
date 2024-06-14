import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "./configs/orm.config";
import { TaskRoute } from "./task_service/task.route";
import { TaskController } from "./task_service/task.controller";
import { TaskService } from "./task_service/task.service";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

const taskRoute = new TaskRoute(new TaskController(new TaskService()));
app.use("/api/v1", taskRoute.router);

connection
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
