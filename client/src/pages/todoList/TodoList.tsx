import { useEffect, useState } from "react";
import AddTodo from "./items/AddTodo";
import TodoHeader from "./items/TodoHeader";
import TodoItem from "./items/TodoItem";
import baseUrl from "../../api/axios";

export interface ITaskData {
  task_id: string;
  task_name: string;
  status: number;
  created_at: Date;
  update_at: Date;
}

export default function TodoList() {
  const [taskData, setTaskData] = useState<ITaskData[]>([]);

  // fetch api function to get all tasks
  const fetchData = async (): Promise<void> => {
    try {
      const response = await baseUrl.get("tasks");
      if (response.status === 200) {
        setTaskData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // use effect to call fetchData function when component mounted
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="flex justify-center items-center h-screen w-full">
        <div className="bg-[#ef5366] p-4 px-6 rounded-xl flex flex-col">
          {/* todo header */}
          <div className="p-4">
            <TodoHeader />
          </div>
          {/* line */}
          <div className="w-full h-[1px] bg-white"></div>
          {/* todo items */}
          <div className="py-3">
            <TodoItem data={taskData} fetchDataCallback={fetchData} />
          </div>
          {/* line */}
          <div className="w-full h-[1px] bg-white"></div>
          {/* add todo */}
          <div className="py-3">
            <AddTodo fetchDataCallback={fetchData} />
          </div>
        </div>
      </div>
    </>
  );
}
