import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

import { addTodo } from "../app/api";

type FormValues = {
  name: string;
};
const schema = Joi.object({
  name: Joi.string().trim().required(),
});

const AddNewTodo: React.FC<{ toggleAdding: () => void }> = React.memo(
  ({ toggleAdding }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormValues>({ resolver: joiResolver(schema) });

    const onSubmit = (data: FormValues) => {
      addTodo(data.name, () => toggleAdding());
    };

    return (
      <div className="w-full px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mb-5">
            <input
              type="text"
              placeholder="New todo name"
              className="input input-bordered input-secondary w-full"
              onKeyDown={(e) => {
                // prevent form submission on enter
                if (e.key === "Enter") e.preventDefault();
              }}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.name.message}
                </span>
              </label>
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
  }
);

export default AddNewTodo;
