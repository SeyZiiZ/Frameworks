import React, { createContext, useState, useEffect, useContext } from "react";

interface UserContextType {
  pseudo: string;
  setPseudo: (newPseudo: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pseudo, setPseudo] = useState<string>(localStorage.getItem("tasksManagerUserName") || "");

  useEffect(() => {
    localStorage.setItem("tasksManagerUserName", pseudo);
  }, [pseudo]);

  return (
    <UserContext.Provider value={{ pseudo, setPseudo }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser doit être utilisé dans un UserProvider");
  }
  return context;
};
