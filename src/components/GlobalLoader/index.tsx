import { useContext, createContext, useState, useCallback } from "react";

import { RiLoader4Line } from "react-icons/ri";

import style from "./style.module.scss";

interface IGlobalLoaderContext {
  addLoader: () => void;
  removeLoader: () => void;
  isLoading: boolean;
}

export const GlobalLoaderContext = createContext<
  IGlobalLoaderContext | undefined
>(undefined);

interface Props {
  children: JSX.Element | JSX.Element[];
}
export function GlobalLoaderProvider({ children }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const addLoader = useCallback(() => {
    setIsLoading(true);
  }, []);

  const removeLoader = useCallback(() => {
    setIsLoading(false);
  }, []);

  const values = {
    addLoader,
    isLoading,
    removeLoader,
  };
  return (
    <GlobalLoaderContext.Provider value={values}>
      {children}
    </GlobalLoaderContext.Provider>
  );
}

export function useGlobalLoader() {
  const context = useContext(GlobalLoaderContext);
  if (!context) {
    throw new Error("useError must be used inside <GlobalLoaderProvider/>");
  }

  return context;
}
export function GlobalLoader() {
  const { isLoading } = useGlobalLoader();
  return (
    <>
      {isLoading && (
        <div
          className="position-fixed"
          style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "var(--color-primary)",
            zIndex: 10000,
            opacity: 0.5,
          }}
        >
          <RiLoader4Line
            className={`${style.loading_icon} d-flex align-items-center justify-content-center h-100 m-auto`}
            color="white"
            size="100px"
          />
        </div>
      )}
    </>
  );
}
