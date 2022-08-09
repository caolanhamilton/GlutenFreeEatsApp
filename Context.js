import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userAddedLocations, setUserAddedLocations] = useState([]);
  const [userFavouritedLocations, setUserFavouritedLocations] = useState([]);
  const [userReview, setUserReview] = useState([]);
  return (
    <AuthContext.Provider value={{ user, setUser, userFavouritedLocations, setUserFavouritedLocations }}>
      {children}
    </AuthContext.Provider>
  );
};
