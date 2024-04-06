// 

import { useState, useEffect } from "react";

function getStorageValue(key:string, defaultValue:string) {
  // getting stored value
  if (typeof window !== 'undefined') {
const saved = localStorage.getItem(key);
return saved || defaultValue;
  }
}

export const useLocalStorage = (key:string, defaultValue:string) => {
  const [value, setValue] = useState<any>(() => {
  return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
// storing input name
  localStorage.setItem(key, value?value:value);
  }, [key, value]);

  return [value, setValue];
};
