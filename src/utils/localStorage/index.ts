// Types
export enum LocalStorageTypes {
  login = "login",
}

export interface Login {
  userGoogleData?: Record<string, string>;
}

export function localStorageFactory<T extends { [key: string]: any }>(
  type: LocalStorageTypes
) {
  const localStorageKey = `pharmaInc${type}`;

  let localStorageItem = localStorage.getItem(localStorageKey);
  if (!localStorageItem) {
    localStorage.setItem(localStorageKey, JSON.stringify({}));
  }

  return {
    addItem: (item: T) => {
      const parsedLocalStorage = JSON.parse(
        localStorage.getItem(localStorageKey) as string
      );
      localStorage.setItem(
        localStorageKey,
        JSON.stringify({ ...parsedLocalStorage, ...item })
      );
    },
    removeItem: (item: keyof T) => {
      localStorage.removeItem(localStorageKey);
    },
    getList: () => {
      return JSON.parse(localStorage.getItem(localStorageKey) as string);
    },
    getItem: (key: keyof T) => {
      const item = JSON.parse(localStorage.getItem(localStorageKey) as string);
      return item[key];
    },
  };
}
