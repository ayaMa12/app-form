import { useContext } from "react";
import { createContext } from "react";
const InputData = [
  // { userName: "Aya Mahmoud", password: 2468, email: "aya@example.com", id: 20 },
  // { userName: "Mohammed Rashed", password: 1357, email: "mohammed@example.com", id: 22 },
];
const DataContext = createContext([]);
export const DataInput2 =createContext("");
export function AllDataContext({ children }) {
  return (
    <DataContext.Provider value={InputData}>{children}</DataContext.Provider>
  );
};
export const useData = () => {
  return useContext(DataContext);
};

