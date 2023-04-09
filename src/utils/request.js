import axios from "axios";
export const request = axios.create({
  baseURL: "http://43.142.192.144:8888/api/private/v1",
  timeout: 5000,
});
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default request;
