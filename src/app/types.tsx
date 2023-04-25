export interface TodoType {
  id: string;
  title: string;
  items: TodoItemType[];
}

export interface TodoItemType {
  id: string;
  title: string;
  description: string;
  date: string;
  finished: boolean;
}

export type StateFilterType = "all" | "active" | "finished" | "missed";
export type StatesFiltersObjectType = Record<
  StateFilterType,
  { activeFilter: boolean; clickAction: () => void }
>;

export type EditTodoFormValues = Omit<TodoType, "id" | "items">;
