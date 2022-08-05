import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.15:8080/",
});

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

export const addFavourite = (userId, locationId) => {
  return api.post(`/favourites`, {
    userId: userId,
    locationId: locationId,
  });
};

export const removeFavourite = (userId, locationId) => {
  return api.patch(`/favourites`, {
    userId: userId,
    locationId: locationId,
  });
};

export const getFavourites = (userId, lat, long, radius) => {
  return api.get(`/favourites/${userId}`, {
    params: {
      "lat": lat,
      "long": long,
      "radius": radius,
    }
  });
};
