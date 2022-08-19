import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userFavouritedLocations, setUserFavouritedLocations] = useState([]);
  const [userLocations, setUserLocations] = useState([]);
  const [userPostedReviews, setUserPostedReviews] = useState([]);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userPostedReviews,
        setUserPostedReviews,
        userLocations,
        setUserLocations,
        userFavouritedLocations,
        setUserFavouritedLocations,
        userFirstName,
        setUserFirstName,
        userLastName,
        setUserLastName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
