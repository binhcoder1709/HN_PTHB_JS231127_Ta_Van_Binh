import { Checkbox, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
import baseUrl from "../../../api/axios";
import { ITaskData } from "../TodoList";

interface Props {
  data: ITaskData[];
  fetchDataCallback: () => void;
}

const TodoItem: FC<Props> = ({ data, fetchDataCallback }) => {
  // update status handler function
  const updateTaskStatus = async (id: string, checked: boolean) => {
    try {
      const response = await baseUrl.put(`task/status/${id}`, {
        status: checked ? 1 : 0,
      });
      if (response.status === 200) {
        message.success("Update Task Status Successfully");
        // Refresh task data after updating status
        fetchDataCallback();
      }
    } catch (error) {
      console.error(error);
      message.error("Update Task Status Failed");
    }
  };

  // delete handler function
  const handleDelete = async (id: string) => {
    try {
      const response = await baseUrl.delete(`task/${id}`);
      if (response.status === 200) {
        message.success("Delete Task Successfully");
        // Refresh task data after updating status
        fetchDataCallback();
      }
    } catch (error) {
      console.error(error);
      message.error("Delete Task Failed");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        {data.length === 0 ? (
          <div className="text-white font-bold">No task</div>
        ) : (
          data.map((item) => (
            <div
              key={item.task_id}
              className="flex items-center justify-between bg-[#f16774] p-2 rounded-lg"
            >
              <span
                style={{
                  textDecorationLine:
                    item.status === 1 ? "line-through" : "none",
                }}
              >
                {item.task_name}
              </span>
              <div className="flex gap-2 items-center">
                <Checkbox
                  checked={item.status === 1}
                  onChange={(e) =>
                    updateTaskStatus(item.task_id, e.target.checked)
                  }
                />
                <FontAwesomeIcon
                  className="cursor-pointer"
                  icon={faTrashCan}
                  onClick={() => handleDelete(item.task_id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default TodoItem;
