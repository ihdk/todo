import React, { useEffect, useRef } from "react";
import { Location, useMatches } from "react-router-dom";
import { format } from "date-fns";
import dayjs from "dayjs";
import { StateFilterType, TodoType } from "./types";
import { ToastOptions, toast } from "react-toastify";

/**
 * Handle document title through routes
 */
export const useDocumentTitle: (title?: string) => void = (title) => {
  const defaultTitle = useRef("Todos list");
  useEffect(() => {
    document.title = [title, defaultTitle.current].filter(Boolean).join(" | ");
  }, [title]);
};

/*
 * Get different type of key for different routes
 */
export const getRestorationKey = (
  location: Location,
  matches: ReturnType<typeof useMatches>
) => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const match = matches.find((m) => (m.handle as any)?.restorationKey);
  if ((match?.handle as any)?.restorationKey === "pathname") {
    return location.pathname;
  }
  return location.key;
};

/*
 * Get formatted date
 */
export const getPrettyDate = (date: string) => {
  return dayjs(new Date(date)).format("D MMMM YYYY HH:mm");
};

/*
 * Check if given date is from past
 */
export const dateIsAfterDeadline = (date: string) => {
  const nowTimestamp = format(new Date(), "T"); // ms timestamp
  const dateTimestamp = format(new Date(date), "T"); // ms timestamp
  return dateTimestamp < nowTimestamp;
};

/*
 * Filter fetched todo items by state and search keyword
 */
export const getFilteredItems = (
  todo: TodoType | undefined,
  stateFilter: StateFilterType,
  searchPhrase: string
) => {
  if (todo === undefined) return null;
  let items = [...todo.items].reverse();
  if (searchPhrase)
    items = items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        item.description.toLowerCase().includes(searchPhrase.toLowerCase())
    );

  switch (stateFilter) {
    case "all":
      return items;
    case "active":
      return items.filter(
        (item) => !dateIsAfterDeadline(item.date) && !item.finished
      );
    case "finished":
      return items.filter((item) => item.finished === true);

    case "missed":
      return items.filter(
        (item) => dateIsAfterDeadline(item.date) && !item.finished
      );
    default:
      return items;
  }
};

/*
 * Displays notification message
 */
type NotifyOptions = {
  text: string;
  title?: string;
  options?: ToastOptions;
};
export const notify = ({ text, title, options }: NotifyOptions) => {
  toast.error(
    <>
      {title && <p className="m-0 p-0 font-bold">{title}</p>}
      <p className="m-0 p-0 text-sm">{text}</p>
    </>,
    { style: { backgroundColor: "hsl(var(--er))" } }
  );
};
