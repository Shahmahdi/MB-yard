import axios from "axios";
import { api, defaultApiVersion } from "../configs/config";

export async function publicPost(
  endpoint: string,
  body: Object,
  apiVersion = defaultApiVersion
) {
  return axios
    .post(`${api}/${apiVersion}/${endpoint}`, body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return errorHandler(error);
    });
}

export function publicGet(endpoint: string, apiVersion = defaultApiVersion) {
  return axios
    .get(`${api}/${apiVersion}/${endpoint}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return errorHandler(error);
    });
}

export function privateGet(
  endpoint: string,
  token: string,
  apiVersion = defaultApiVersion
) {
  const config = {
    "content-type": "application/json",
    headers: { Authorization: `Bearer ${token}` }
  };
  return axios
    .get(`${api}/${apiVersion}/${endpoint}`, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return errorHandler(error);
    });
}

export function privatePost(
  endpoint: string,
  body: Object,
  token: string,
  apiVersion = defaultApiVersion
) {
  const config = {
    "content-type": "application/json",
    headers: { Authorization: `Bearer ${token}` }
  };
  return axios
    .post(`${api}/${apiVersion}/${endpoint}`, JSON.stringify(body), config)
    .then((response) => {
      return response;
    })
    .catch((error) => errorHandler(error));
}

export function privateDelete(
  endpoint: string,
  token: string,
  apiVersion = defaultApiVersion
) {
  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
  return axios
    .delete(`${api}/${apiVersion}/${endpoint}`, config)
    .then((response) => {
      return response;
    })
    .catch((error) => errorHandler(error));
}

const errorHandler = (error: any) => {
  if (error.response && error.response.status) {
    const status = error.response.status;
    const unauthorized = 401;
    if (status === unauthorized) {
      // logout the user
      // store.dispatch(logOut());
    }
  }
  throw error;
};
