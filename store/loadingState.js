import { createContext, useContext, useState } from "react";

const loaderContext = createContext();

export const LoadingStateProvider = ({ children }) => {
  const [sessionLoader, setSessionLoader] = useState(false);
  return (
    <loaderContext.Provider
      value={{
        sessionLoader,
        setSessionLoader,
      }}
    >
      {children}
    </loaderContext.Provider>
  );
};

export const useLoadingProvider = () => useContext(loaderContext);
