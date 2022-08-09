import axios from "axios";
import { getIdToken } from "../firebaseAuthFuncs";

const api = axios.create({
  baseURL: "http://192.168.0.15:8080/",
});

export const getUserDetailsByID = async () => {
  const idToken = await getIdToken();
  return api.get("/users/getByUserId", {
    headers: {
      Authorization: `Bearer: ${idToken}`,
    },
  });
};

export const createLocation = ({
  address,
  dedicatedGlutenFree,
  description,
  image,
  lat,
  lng,
  name,
  phone,
  userId,
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
    userId: userId,
  };
  return api.post(`/locations`, location);
};

export const postReview = (reviewObj) => {
  return api.post(`/reviews`, reviewObj);
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

export const getReviewsById = (id) => {
  return api.get(`/reviews/${id}`);
};

export const addFavourite = async (locationId) => {
  const idToken = await getIdToken();
  return api.post(
    `/favourites`,
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
    `/favourites`,
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
  return api.get(`/favourites`, {
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
