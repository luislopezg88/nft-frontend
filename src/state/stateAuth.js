import { useContext, createContext, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  info: {},
  createUser: () => {},
  deleteUser: () => {},
});

function getUser() {
  if (sessionStorage.getItem("session-chef") !== null) {
    let session = sessionStorage.getItem("session-chef");
    let parseado = JSON.parse(session);
    const [{ info, active }] = parseado;
    return { info, active };
  } else {
    return { info: {}, active: false };
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getUser());

  function createUser(data) {
    const objeto = {
      info: data,
      active: true,
    };

    let store = [];
    store.push(objeto);
    sessionStorage.setItem("session-chef", JSON.stringify(store));

    setUser(objeto);
  }

  function deleteUser() {
    if (sessionStorage.getItem("session-chef") !== null) {
      sessionStorage.removeItem("session-chef");
    }
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: user?.active ?? false,
        info: user?.info ?? {},
        createUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
