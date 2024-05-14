import environmentVariables from "@/config/environmentVariables";
import axios from "axios";

const apiClient = axios.create({
  baseURL: environmentVariables.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (e) => {
    // Do something with request error
    if (e.response) {
      const response = e.response.data;
      const message = response.message || "An error occurred";

      const error = new Error(message);

      if (response.validationErrors) {
        // @ts-expect-error This is a custom property we're adding to the error
        error.validationErrors = response.validationErrors;
      }

      throw error;
    }
  }
);

export default apiClient;
