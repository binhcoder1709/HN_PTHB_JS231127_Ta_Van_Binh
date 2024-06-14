import connection from "../configs/orm.config";
import { Task } from "../entities/task.entity";

export class TaskService {
  findAll = async (): Promise<Task[]> => {
    return await connection.getRepository(Task).find();
  };

  findById = async (id: string): Promise<Task | null> => {
    const result = await connection
      .getRepository(Task)
      .findOneBy({ task_id: id });
    if (result) {
      return result;
    } else {
      return null;
    }
  };

  createOne = async (data: Partial<Task>): Promise<Task> => {
    const task = await connection.getRepository(Task).save(data);
    return task;
  };

  updateOne = async (id: string, data: Partial<Task>): Promise<Task | null> => {
    const findTask = connection.getRepository(Task).findOneBy({ task_id: id });

    if (!findTask) {
      return null;
    }

    const updatedTask = await connection.getRepository(Task).save({
      ...findTask,
      ...data,
    });

    return updatedTask;
  };

  updateStatus = async (id: string, status: number): Promise<Task | null> => {
    const findTask = await connection
      .getRepository(Task)
      .findOneBy({ task_id: id });
    if (!findTask) {
      return null;
    }
    findTask.status = status;
    const updatedTask = await connection.getRepository(Task).save(findTask);
    return updatedTask;
  };

  deleteOne = async (id: string): Promise<boolean | null> => {
    const findTask = connection.getRepository(Task).findOneBy({ task_id: id });
    if (!findTask) {
      return null;
    }
    await connection.getRepository(Task).delete({ task_id: id });
    return true;
  };
}
