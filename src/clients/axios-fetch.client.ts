import Axios, { AxiosInstance } from 'axios';

const fetchAxiosClient : AxiosInstance = Axios.create({
  // TODO: should parameterize this base URL
  // TODO: when deploying, put this back as long as we're using HTTPS
  // baseURL: "https://frontend-take-home-service.fetch.com", 
  baseURL: "api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default fetchAxiosClient;
