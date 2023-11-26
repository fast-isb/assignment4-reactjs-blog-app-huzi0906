/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";
import { FieldValues } from "react-hook-form";

export interface Response<T> {
  Message: string;
  data: T;
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use(config => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.token = token;
  }
  return config;
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getRequest = (config: AxiosRequestConfig = {}) => {
    return axiosInstance
      .get<Response<T>>(this.endpoint, config)
      .then(res => res.data);
  };

  postRequest = (data: FieldValues, config: AxiosRequestConfig = {}) => {
    return axiosInstance
      .post<Response<T>>(this.endpoint, data, config)
      .then(res => res.data);
  };

  putRequest = (data: FieldValues, config: AxiosRequestConfig = {}) => {
    return axiosInstance
      .put<Response<T>>(this.endpoint, data, config)
      .then(res => res.data);
  };

  patchRequest = (data: FieldValues, config: AxiosRequestConfig = {}) => {
    return axiosInstance
      .patch<Response<T>>(this.endpoint, data, config)
      .then(res => res.data);
  };

  deleteRequest = (config: AxiosRequestConfig = {}) => {
    return axiosInstance
      .delete<Response<T>>(this.endpoint, config)
      .then(res => res.data);
  };
}

export default APIClient;
