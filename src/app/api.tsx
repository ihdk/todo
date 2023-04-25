import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { TodoType, TodoItemType, EditTodoFormValues } from "./types";
import { notify } from "./helpers";

const source =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "dev"
    : "test";
const apiUrlBase = `https://631f480022cefb1edc48005f.mockapi.io/demo-api/${source}/`;

/**
 * Get all todos for dashboard page
 */
export const useGetTodos = () => {
  const getTodos = (): Promise<TodoType[]> =>
    axios
      .get(apiUrlBase)
      .then((response) => response.data.reverse())
      .catch((error: unknown) => {
        handleError(error);
      });
  return useQuery(["todos"], getTodos);
};

/**
 * Get todo item by ID
 */
export const useGetTodo = (id: string | undefined) => {
  const getTodo = (): Promise<TodoType> =>
    axios
      .get(`${apiUrlBase}/${id}`)
      .then((response) => response.data)
      .catch((error: unknown) => {
        handleError(error);
      });
  return useQuery(["todo", id], getTodo);
};

/**
 * Add/edit todo list
 */
export const editTodo = async (
  data: { formData: EditTodoFormValues; editedTodo: TodoType | null },
  successCallback?: () => void,
  errorCallback?: () => void
) => {
  const addingNew = data.editedTodo === null;

  const todoData = addingNew
    ? { title: data.formData.title }
    : { ...data.editedTodo, title: data.formData.title };

  await axios({
    method: addingNew ? "post" : "put",
    url: addingNew ? apiUrlBase : apiUrlBase + data.editedTodo?.id,
    data: todoData,
  })
    .then((response) => {
      if (response.status === 200 || response.status === 201) {
        if (successCallback !== undefined) successCallback();
      } else {
        if (errorCallback !== undefined) errorCallback();
      }
    })
    .catch((error) => {
      if (errorCallback !== undefined) errorCallback();
      handleError(error);
    });
};

/**
 * Remove todo
 */
export const deleteTodo = async (
  id: string,
  successCallback?: () => void,
  errorCallback?: () => void
) => {
  await axios
    .delete(apiUrlBase + id)
    .then((response) => {
      if (response.status === 200) {
        if (successCallback !== undefined) successCallback();
      } else {
        if (errorCallback !== undefined) errorCallback();
      }
    })
    .catch((error) => {
      if (errorCallback !== undefined) errorCallback();
      handleError(error);
    });
};

/**
 * Set todo item finished state
 */
export const updateTodoItem = async (
  action: "add" | "update" | "delete",
  data: {
    todo: TodoType;
    itemData: TodoItemType;
  },
  successCallback?: () => void,
  errorCallback?: () => void
) => {
  const { todo, itemData } = data;

  let updatedItems = [] as TodoItemType[];

  switch (action) {
    case "add":
      updatedItems = [...todo.items, itemData];

      break;
    case "update":
      updatedItems = todo.items.map((item) =>
        item.id === itemData.id ? itemData : item
      );
      break;
    case "delete":
      updatedItems = todo.items.filter((item) => item.id !== itemData.id);
      break;

    default:
      break;
  }

  const newData = { ...todo, items: updatedItems };

  await axios
    .put(apiUrlBase + todo.id, newData)
    .then((response) => {
      if (response.status === 200) {
        if (successCallback !== undefined) successCallback();
      } else {
        if (errorCallback !== undefined) errorCallback();
      }
    })
    .catch((error) => {
      if (errorCallback !== undefined) errorCallback();
      handleError(error);
    });
};

/**
 * Handle api error response
 */
const handleError = (error: unknown) => {
  let message = "Something went wrong.";
  let status = "" as string | undefined;
  if (axios.isAxiosError<{ error?: { message: string } }>(error)) {
    message = error.message;
    status = error.response?.statusText;
  }
  notify({ title: status, text: message });
  throw new Error(message);
};
