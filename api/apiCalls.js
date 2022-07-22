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
  return api.post(`/locations`, location);
};

export const postReview = (id, reviewText, overAllRating, safetyRating) => {
  const review = {
    reviewText: reviewText,
    overallRating: overAllRating,
    safetyRating: safetyRating,
    locationId: id,
  };
  return api.post(`/reviews`, review);
};

export const getLocations = (locationObj, dedicatedGlutenFree, safetyScore) => { 
    let params;
    if (dedicatedGlutenFree) {
        params = {
            lat: locationObj.lat,
            lng: locationObj.lng,
            filter: 'dedicatedGlutenFree',
        };
    } else if (safetyScore) {
        params = {
            lat: locationObj.lat,
            lng: locationObj.lng,
            filter: 'safetyScore',
            sort: 'safetyScore',
        };
    } else {
        params = {
            lat: locationObj.lat,
            lng: locationObj.lng,
        };
    }
    return api.get(`/locations`, {
        params: params,
    });
}

