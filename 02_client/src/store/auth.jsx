import { createContext, useContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";

// Step 1
export const AuthContext = createContext(); // Context API

// Step 2
export const AuthProvider = (props) => {
  const url = "https://comprehensive-service-hub-backend-new.onrender.com";
  // const url = "http://localhost:4000";

  const [token, setToken] = useState(localStorage.getItem("token")); // localStorage.getItem('token')
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);

  const storeTokenInLocalStorage = (serverToken) => {
    setToken(serverToken); // Very Important
    return localStorage.setItem("token", serverToken);
  };

  // Check that, is the user loggedIn or not
  const isLoggedIn = !!token;
  const isAdmin = user.isAdmin;

  if (isLoggedIn === false) console.log("User is logged out");
  else console.log("User is logged in");

  console.log(isLoggedIn, !!token, "auth.jsx TOKEN: ", token);

  // Logout Functionality
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  // JWT AUTHENTICATION - to get the currently LoggedIn user data from Backend.
  const userAuthentication = async () => {
    // Never write (req,res) in 'Frontend'.
    try {
      setIsLoading(true);

      const response = await fetch(`${url}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.userData);
      } else {
        console.log(
          "The user is not LoggedIn(auth.jsx), So we are unable to provide JWT Token!!!"
        );
      }

      setIsLoading(false); // This loading effect stops the first time unnecessary rendering
    } catch (error) {
      console.log("Error in fetching user data(auth.jsx) : ", error);
    }
  };

  // To fetch Services data from database
  const getServices = async () => {
    try {
      const response = await fetch(`${url}/api/data/service`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setServices(data.message);
      } else {
        console.log(
          `In getServices function(auth.jsx)--> response is not 'OK'`
        );
      }
    } catch (error) {
      console.log(`Services frontend error : ${error}`);
    }
  };

  useEffect(() => {
    getServices();
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        url,
        storeTokenInLocalStorage,
        LogoutUser,
        isLoggedIn,
        user,
        services,
        token,
        isLoading,
        isAdmin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

// Step 3
export const useAuth = () => {
  return useContext(AuthContext);
};
