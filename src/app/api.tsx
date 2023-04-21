import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { TodoType, TodoItemType } from "./types";
import { notify } from "./helpers";

const apiUrlBase = "https://631f480022cefb1edc48005f.mockapi.io/demo-api";

/**
 * Get all todos for dashboard page
 */
export const useGetTodos = () => {
  const getTodos = (): Promise<TodoType[]> =>
    axios
      .get(`${apiUrlBase}/test`)
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
      .get(`${apiUrlBase}/test/${id}`)
      .then((response) => response.data)
      .catch((error: unknown) => {
        handleError(error);
      });
  return useQuery(["todo", id], getTodo);
};

/**
 * Add new todo list
 */
export const addTodo = async (
  title: string,
  successCallback?: () => void,
  errorCallback?: () => void
) => {
  const newTodo = {
    title: title,
  };
  await axios
    .post(`${apiUrlBase}/test`, newTodo)
    .then((response) => {
      if (response.status === 201) {
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
    .delete(`${apiUrlBase}/test/${id}`)
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
    .put(`${apiUrlBase}/test/${todo.id}`, newData)
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
