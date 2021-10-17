import { useContext, createContext, useState, useCallback } from "react";

import { ErrorComponent } from "components";

interface IErrorContext {
  addError: () => void;
  removeError: () => void;
  toggleError: () => void;
  isError: boolean;
}

export const ErrorContext = createContext<IErrorContext | undefined>(undefined);

interface Props {
  children: JSX.Element | JSX.Element[];
}
export function ErrorContainerProvider({ children }: Props) {
  const [isError, setIsError] = useState(false);

  const addError = useCallback(() => {
    setIsError(true);
  }, []);

  const removeError = useCallback(() => {
    setIsError(false);
  }, []);

  const toggleError = useCallback(() => {
    setIsError((prev) => !prev);
  }, []);

  const values = { addError, isError, removeError, toggleError };
  return (
    <ErrorContext.Provider value={values}>{children}</ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used inside <ErrorContainerProvider/>");
  }

  return context;
}

export const ErrorContainerHandler = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const { isError } = useError();
  return !isError ? children : <ErrorComponent />;
};
