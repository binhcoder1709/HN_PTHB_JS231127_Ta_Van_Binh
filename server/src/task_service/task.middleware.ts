import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { AddTaskDto } from "./dto/addTask.dto";
import { ValidationError, validate } from "class-validator";

export class TaskMiddleware {
  addTaskMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const addTaskDTO = plainToClass(AddTaskDto, req.body);

    const error: ValidationError[] = await validate(addTaskDTO);

    if (error.length > 0) {
      const messages = error
        .map((err: ValidationError) =>
          Object.values(err.constraints ?? {}).join("?")
        )
        .join("?");
      return res.status(400).json({ message: messages });
    }

    next();
  };
}
