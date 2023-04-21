import React, { useContext } from "react";
import { useForm, Controller, Control } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { DatePicker } from "antd";

import { TodoContext, TodoContextType } from "../pages/todo-detail";
import { updateTodoItem, useGetTodo } from "../app/api";
import { NewItemFormValues } from "../app/types";

const schema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().allow(""),
  date: Joi.date().required(),
});

const AddNewTodoItem: React.FC<{ toggleAdding: () => void }> = ({
  toggleAdding,
}) => {
  const { todo } = useContext<TodoContextType>(TodoContext);
  const { refetch } = useGetTodo(todo.id);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewItemFormValues>({ resolver: joiResolver(schema) });

  const onSubmit = (data: NewItemFormValues) => {
    const itemData = {
      ...data,
      date: dayjs(data.date).format(),
      finished: false,
      id: uuidv4(),
    };

    updateTodoItem(
      "add",
      {
        todo,
        itemData,
      },
      () => {
        refetch();
        toggleAdding();
      }
    );
  };

  return (
    <div className="w-full px-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mb-5">
          <div className="input-wrapper mb-2">
            <label className="label">
              <span className="label-text">Item title:</span>
            </label>
            <input
              type="text"
              className="input input-bordered input-secondary w-full"
              onKeyDown={(e) => {
                // prevent form submission on enter
                if (e.key === "Enter") e.preventDefault();
              }}
              {...register("title")}
            />
            {errors.title && (
              <div className="text-xs text-error pl-2 mt-1" role="alert">
                {errors.title.message}
              </div>
            )}
          </div>

          <div className="input-wrapper mb-2">
            <label className="label">
              <span className="label-text">Item description:</span>
            </label>
            <textarea
              className="textarea textarea-secondary w-full block"
              {...register("description", { required: false })}
            ></textarea>
            {errors.description && (
              <div className="text-xs text-error pl-2 mt-1" role="alert">
                {errors.description.message}
              </div>
            )}
          </div>
        </div>
        <div className="input-wrapper mb-2">
          <DateInput control={control} />
          {errors.date && (
            <div className="text-xs text-error pl-2 mt-1" role="alert">
              {errors.date.message}
            </div>
          )}
        </div>

        <div className="w-full flex items-center justify-end">
          <button className="btn btn-ghost mr-2" onClick={toggleAdding}>
            Cancel
          </button>
          <input
            type="submit"
            value="Insert"
            className="btn btn-outline btn-secondary"
          />
        </div>
      </form>
    </div>
  );
};

const DateInput: React.FC<{ control: Control<NewItemFormValues> }> = ({
  control,
}) => {
  return (
    <>
      <div className="flex items-center">
        <label className="label">
          <span className="label-text">Deadline:</span>
        </label>

        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, name, value } }) => (
            <DatePicker
              format="YYYY-MM-DD HH:mm"
              showTime
              showSecond={false}
              onChange={(date) => {
                onChange(dayjs(date).format("YYYY-MM-DD HH:mm"));
              }}
              bordered={false}
            />
          )}
        />
      </div>
    </>
  );
};

export default React.memo(AddNewTodoItem);
