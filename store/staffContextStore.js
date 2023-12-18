import { createContext, useContext, useState } from "react";

const appContext = createContext();

export const StoreProvider = ({ children }) => {
  var userSession, __sessionStorage;
  var userAuth, __sessionAuth;
  if (typeof window !== "undefined") {
    __sessionStorage = sessionStorage.getItem("TM_STF_USR");
    __sessionAuth = sessionStorage.getItem("TM_STF_TK");
    //set initial value of user in Session data
    __sessionStorage != undefined || __sessionStorage != "undefined"
      ? (userSession = JSON.parse(__sessionStorage))
      : (userSession = undefined);

    //set initial value of session auth
    __sessionAuth != undefined || __sessionAuth != "undefined"
      ? (userAuth = userAuth)
      : (userAuth = undefined);
  } else {
    userSession = undefined;
  }
  const [session, setSession] = useState(userSession);
  const [sessionAuth, setSessionAuth] = useState(userAuth);
  return (
    <appContext.Provider
      value={{
        session,
        setSession,

        sessionAuth,
        setSessionAuth,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const StaffContextStore = () => useContext(appContext);
