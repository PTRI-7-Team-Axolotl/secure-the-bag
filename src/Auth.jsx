import React, { useState, createContext, useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";

// interface AuthContextType {
//   user: any;
//   signin: (user: string, callback: VoidFunction) => void;
//   signout: (callback: VoidFunction) => void;
// }

// generate default context
let AuthContext = createContext({user: null});

function AuthProvider({ children }) {
  let auth = useAuth();
  let [user, setUser] = useState(auth.user);

  let signin = (newUser, callback) => {
    console.log('signing in');
    console.log(newUser)
    setUser(newUser);
    console.log('User set --> ', user);
    callback();
  };

  let signout = (callback) => {
    console.log('sigining out');
    setUser(null);
    const now = new Date();
    document.cookie = `SID=loggedOut;expires=${now.toUTCString()};`;
    callback();
  };


  let value = { user, signin, signout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();
  console.log('User --> ', auth.user);
  // if auth.user doesn't exist yet (aka not logged in), will Navigate to Login page
  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    console.log('Login to view your user dashboard!');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // if auth.user exists, will return User page
  return children;
}

export { useAuth, RequireAuth, AuthProvider };
