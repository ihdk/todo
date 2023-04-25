import React, { useContext, useState } from "react";
import { useForm, Controller, Control } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { DatePicker } from "antd";

import { TodoContext, TodoContextType } from "../pages/todo-detail";
import { updateTodoItem, useGetTodo } from "../app/api";
import { TodoItemType } from "../app/types";

const schema = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().allow(""),
  date: Joi.date().required(),
  finished: Joi.boolean(),
});

const EditTodoItemForm: React.FC = () => {
  const { todo, toggleEditing, editedItem } =
    useContext<TodoContextType>(TodoContext);
  const [submitting, setSubmitting] = useState(false);
  const { refetch } = useGetTodo(todo.id);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoItemType>({
    defaultValues: {
      title: editedItem?.title,
      description: editedItem?.description,
      date: editedItem?.date,
    },
    resolver: joiResolver(schema),
  });

  const onSubmit = (data: TodoItemType) => {
    const itemData = {
      ...data,
      date: dayjs(data.date).format(),
      finished: editedItem === null ? false : editedItem.finished,
      id: editedItem === null ? uuidv4() : editedItem.id,
    };
    setSubmitting(true);
    updateTodoItem(
      editedItem === null ? "add" : "update",
      {
        todo,
        itemData,
      },
      () => {
        refetch();
        toggleEditing();
      }
    );
  };

  return (
    <div className="w-full px-5">
      <h2 className="mt-0 mb-4 text-secondary">
        {editedItem === null ? (
          "New item"
        ) : (
          <>
            Editing&nbsp;
            <span className="text-secondary">{editedItem.title}</span>
          </>
        )}
      </h2>
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
          <button className="btn btn-ghost mr-2" onClick={toggleEditing}>
            Cancel
          </button>
          <button
            type="submit"
            className={`btn btn-outline btn-secondary ${
              submitting ? "loading" : ""
            }`}
            disabled={submitting}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const DateInput: React.FC<{ control: Control<TodoItemType> }> = React.memo(
  ({ control }) => {
    return (
      <>
        <div className="flex items-center">
          <label className="label">
            <span className="label-text">Deadline:</span>
          </label>
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                format="D MMMM YYYY HH:mm"
                showTime
                showSecond={false}
                value={value ? dayjs(value) : null}
                onChange={(date) => {
                  onChange(
                    date ? dayjs(date).format("D MMMM YYYY HH:mm") : null
                  );
                }}
                bordered={false}
              />
            )}
          />
        </div>
      </>
    );
  }
);

export default React.memo(EditTodoItemForm);
