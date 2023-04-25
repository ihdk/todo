import React from "react";

import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export const PageWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="relative flex min-h-screen flex-col justify-start overflow-hidden bg-base-100 py-6 sm:py-12 ">
      <div className="px-2 py-10 w-full max-w-4xl sm:mx-auto prose">
        {children}
        <ToastContainer autoClose={3000} theme="colored" />
      </div>
    </div>
  );
};

export const ContentWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="py-5 mt-5 shadow-xl ring-1 ring-gray-900/5 bg-white sm:rounded-lg">
      {children}
    </div>
  );
};

export const Header: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
      {children}
    </div>
  );
};

export const Title: React.FC<{
  text: string;
  prefix?: string;
  colored?: boolean;
}> = ({ text, prefix, colored }) => {
  return (
    <h1 className={`m-0 ${colored ? "text-primary" : ""}`}>
      {prefix && (
        <span className={colored ? "text-primary/40" : ""}>{prefix} / </span>
      )}
      {text}
    </h1>
  );
};

export const EditButton: React.FC<{ action: () => void }> = React.memo(
  ({ action }) => {
    return (
      <button
        className="btn btn-xs btn-square btn-outline btn-primary"
        onClick={(e) => {
          e.preventDefault();
          action();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
          />
        </svg>
      </button>
    );
  }
);

export const DeleteButton: React.FC<{
  action: () => void | Promise<void>;
  loading?: boolean;
}> = React.memo(({ action, loading = false }) => {
  return (
    <button
      className={`btn btn-xs btn-square btn-outline btn-error ${
        loading ? "loading" : ""
      }`}
      onClick={(e) => {
        e.preventDefault();
        action();
      }}
    >
      {!loading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
    </button>
  );
});

export const AddNewButton: React.FC<{
  text: string;
  action: () => void;
  visible?: boolean;
}> = React.memo(({ text, action, visible }) => {
  return visible ? (
    <button className="btn btn-sm btn-outline btn-secondary" onClick={action}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4 mr-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
      {text}
    </button>
  ) : null;
});

export const Loader: React.FC<{ small?: boolean }> = ({ small }) => {
  return (
    <div className="flex justify-center">
      <svg
        aria-hidden="true"
        className={`${
          small ? "w-4 h-4" : "w-8 h-8"
        } text-primary/40 animate-spin fill-primary`}
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  );
};

export const DeadlineLabel: React.FC<{ text: string; afterDeadline: boolean }> =
  React.memo(({ text, afterDeadline }) => (
    <div
      className={`badge badge-sm gap-1 h-6 ${
        afterDeadline ? "badge-error" : "badge-primary"
      }`}
    >
      {text}
    </div>
  ));

export const NothingToShow: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <p className="text-center text-error my-1">
      {text ? text : "Nothing to show."}
    </p>
  );
};

export const HomeIconLink: React.FC = () => (
  <Link to="/" className="text-inherit flex">
    <button className="btn btn-sm btn-square btn-outline btn-secondary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
        />
      </svg>
    </button>
  </Link>
);
