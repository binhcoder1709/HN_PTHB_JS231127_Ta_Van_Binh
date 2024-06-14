import express from "express";
import { TaskController } from "./task.controller";

export class TaskRoute {
  public router = express.Router();
  private taskController: TaskController;

  constructor(taskController: TaskController) {
    this.taskController = taskController;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/tasks", this.taskController.getTasks);
    this.router.get("/task/:id", this.taskController.getTaskById);
    this.router.post("/task", this.taskController.addTask);
    this.router.put("/task/:id", this.taskController.updateTask);
    this.router.put("/task/status/:id", this.taskController.updateStatus);
    this.router.delete("/task/:id", this.taskController.deleteTask);
  }
}
