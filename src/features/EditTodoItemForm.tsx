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
      <h2 className="mb-4 mt-0 text-secondary">
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
        <div className="mb-5 w-full">
          <div className="input-wrapper mb-2">
            <label className="label">
              <span className="label-text">Item title:</span>
            </label>
            <input
              type="text"
              className="input-bordered input-secondary input w-full"
              onKeyDown={(e) => {
                // prevent form submission on enter
                if (e.key === "Enter") e.preventDefault();
              }}
              {...register("title")}
            />
            {errors.title && (
              <div className="mt-1 pl-2 text-xs text-error" role="alert">
                {errors.title.message}
              </div>
            )}
          </div>

          <div className="input-wrapper mb-2">
            <label className="label">
              <span className="label-text">Item description:</span>
            </label>
            <textarea
              className="textarea-secondary textarea block w-full"
              {...register("description", { required: false })}
            ></textarea>
            {errors.description && (
              <div className="mt-1 pl-2 text-xs text-error" role="alert">
                {errors.description.message}
              </div>
            )}
          </div>
        </div>
        <div className="input-wrapper mb-2">
          <DateInput control={control} />
          {errors.date && (
            <div className="mt-1 pl-2 text-xs text-error" role="alert">
              {errors.date.message}
            </div>
          )}
        </div>

        <div className="flex w-full items-center justify-end">
          <button className="btn-ghost btn mr-2" onClick={toggleEditing}>
            Cancel
          </button>
          <button
            type="submit"
            className={`btn-outline btn-secondary btn ${
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
