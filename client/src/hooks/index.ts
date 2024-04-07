import { useState, useEffect } from 'react';
import { ILocalStorage } from '../../models/interface';
declare var localStorage:ILocalStorage;
function useLocalStorage(key:string, initialValue:string) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      // Get from local storage by key
      
      const item = localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? (item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
 
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value:string) => {
      setStoredValue(value);
      // Save to local storage
      
      localStorage.setItem(key, (value));
  };
 
  const clear =()=>{
   
    localStorage.clear()
  };
  useEffect(() => {
    
    localStorage.setItem(key, (storedValue));
  }, [key, storedValue]);
 
  return {storedValue, setValue,clear};
}
 
export default useLocalStorage;