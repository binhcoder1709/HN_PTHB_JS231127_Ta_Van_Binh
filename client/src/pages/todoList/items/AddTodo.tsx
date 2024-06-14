import { Button, Input, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import baseUrl from "../../../api/axios";
import { FC } from "react";

interface FormValues {
  todoName: string;
}

interface IData {
  task_name: string;
}

interface Props {
  fetchDataCallback: () => void;
}

const AddTodo: FC<Props> = ({ fetchDataCallback }) => {
  const formik = useFormik<FormValues>({
    initialValues: {
      todoName: "",
    },
    validationSchema: Yup.object({
      todoName: Yup.string().required("Todo name is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const data: IData = {
        task_name: values.todoName,
      };

      try {
        const response = await baseUrl.post("task", data);
        if (response.status === 201) {
          message.success("Thêm task thành công");
          fetchDataCallback();
          resetForm();
        }
      } catch (error) {
        console.error(error);
        message.error("Thêm task thất bại");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-lg">Add the todo list</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Enter todo here"
            name="todoName"
            value={formik.values.todoName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <Button htmlType="submit">Add item</Button>
        </div>
        {formik.touched.todoName && formik.errors.todoName ? (
          <div className="text-white">{formik.errors.todoName}</div>
        ) : null}
      </div>
    </form>
  );
};

export default AddTodo;
