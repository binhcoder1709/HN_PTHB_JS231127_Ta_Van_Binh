import { TaskService } from "./task.service";
import { Response, Request } from "express";

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  getTasks = async (req: Request, res: Response): Promise<Response> => {
    try {
      const response = await this.taskService.findAll();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  };

  getTaskById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const response = await this.taskService.findById(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  };

  addTask = async (req: Request, res: Response): Promise<Response> => {
    try {
      const data = req.body;
      await this.taskService.createOne(data);
      return res.status(201).json({ message: "Task created successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  };

  updateTask = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const data = req.body;
      await this.taskService.updateOne(id, data);
      return res.status(200).json({ message: "Task Update Successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  };

  updateStatus = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await this.taskService.updateStatus(id, status);
      return res.status(200).json({ message: "Task Update Status Successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  };

  deleteTask = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      await this.taskService.deleteOne(id);
      return res.status(200).json({ message: "Task Delete Successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  };
}
