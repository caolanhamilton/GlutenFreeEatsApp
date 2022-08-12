import axios from "axios";
import { getIdToken } from "../firebaseAuthFuncs";

const api = axios.create({
  baseURL: "http://192.168.0.15:8080",
});

//locations

export const createLocation = async ({
  address,
  dedicatedGlutenFree,
  description,
  image,
  lat,
  lng,
  name,
  phone,
}) => {
  const location = {
    name: name,
    address: address,
    dedicatedGlutenFree: dedicatedGlutenFree,
    description: description,
    image: image,
    lat: lat,
    lng: lng,
    phone: phone,
    categoryId: 3,
  };
  const idToken = await getIdToken();
  return api.post(`/locations`, location, {
    headers: {
      Authorization: `Bearer: ${idToken}`,
    },
  });
};

export const getLocations = (
  locationObj,
  dedicatedGlutenFree,
  safetyScore,
  radius
) => {
  let params;
  if (dedicatedGlutenFree) {
    params = {
      radius: radius,
      lat: locationObj.lat,
      lng: locationObj.lng,
      filter: "dedicatedGlutenFree",
    };
  } else if (safetyScore) {
    params = {
      radius: radius,
      lat: locationObj.lat,
      lng: locationObj.lng,
      filter: "safetyScore",
      sort: "safetyScore",
    };
  } else {
    params = {
      radius: radius,
      lat: locationObj.lat,
      lng: locationObj.lng,
    };
  }
  return api.get(`/locations`, {
    params: params,
  });
};

export const postReview = async (reviewObj) => {
  const idToken = await getIdToken();
  return api.post(`/locations/reviews`, reviewObj, {
    headers: {
      Authorization: `Bearer: ${idToken}`,
    },
  });
};

export const getReviewsById = (locationId) => {
  return api.get(`/locations/reviews/${locationId}`);
};

//users

export const createUser = async (userObj) => {
  const idToken = await getIdToken();
  return api.post(`/users`, userObj, {
    headers: {
      Authorization: `Bearer: ${idToken}`,
    },
  });
};

export const deleteUser = async () => {
  const idToken = await getIdToken();
  return api.delete(`/users`, {
    headers: {
      Authorization: `Bearer: ${idToken}`,
    },
  });
};

export const addFavourite = async (locationId) => {
  const idToken = await getIdToken();
  return api.post(
    `/users/favourites`,
    {
      locationId: locationId,
    },
    {
      headers: {
        Authorization: `Bearer: ${idToken}`,
      },
    }
  );
};

export const removeFavourite = async (locationId) => {
  const idToken = await getIdToken();
  return api.patch(
    `/users/favourites`,
    {
      locationId: locationId,
    },
    {
      headers: {
        Authorization: `Bearer: ${idToken}`,
      },
    }
  );
};

export const getFavourites = async (lat, long, radius) => {
  const idToken = await getIdToken();
  return api.get(`/users/favourites`, {
    headers: {
      Authorization: `Bearer: ${idToken}`,
    },
    params: {
      lat: lat,
      long: long,
      radius: radius,
    },
  });
};

export const getUserDetailsByID = async () => {
  const idToken = await getIdToken();
  return api.get("/users/getByUserId", {
    headers: {
      Authorization: `Bearer: ${idToken}`,
    },
  });
};
