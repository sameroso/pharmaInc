/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { localStorageFactory, LocalStorageTypes, Login } from "./localStorage";

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
}

export function useAuth() {
  const { addItem, removeItem, getItem } = localStorageFactory<Login>(
    LocalStorageTypes.login
  );

  const history = useHistory();

  const logout = useCallback(() => {
    removeItem("userGoogleData");
    history.push("/");
  }, []);

  const login = useCallback((data: any) => {
    addItem({ userGoogleData: data });
    history.push("/dashboard");
  }, []);

  const loginObj = getItem("userGoogleData");

  return { login, logout, loginObj };
}
