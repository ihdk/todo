import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import { editTodo } from "../app/api";
import { DashboardContext } from "../pages/dashboard";
import { EditTodoFormValues } from "../app/types";

const schema = Joi.object({
  title: Joi.string().trim().required(),
});

const EditTodoForm: React.FC = () => {
  const { toggleEditing, editedTodo } = useContext(DashboardContext);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTodoFormValues>({
    defaultValues: { title: editedTodo?.title },
    resolver: joiResolver(schema),
  });

  const onSubmit = (data: EditTodoFormValues) => {
    setSubmitting(true);
    editTodo({ formData: data, editedTodo }, () => toggleEditing());
  };

  return (
    <div className="w-full px-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full mb-5">
          <input
            type="text"
            placeholder="Todo name"
            className="input input-bordered input-secondary w-full"
            onKeyDown={(e) => {
              // prevent form submission on enter
              if (e.key === "Enter") e.preventDefault();
            }}
            {...register("title", { required: true })}
          />
          {errors.title && (
            <label className="label">
              <span className="label-text-alt text-error">
                {errors.title.message}
              </span>
            </label>
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

export default React.memo(EditTodoForm);
