 
import axios from "axios";

export const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

apiInstance.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

let refreshPromise = null;

apiInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

   if (
  error.response?.status !== 401 ||
  !originalRequest ||
  originalRequest._retry ||
  originalRequest.url?.includes("/api/auth/refreshToken") ||
  originalRequest.url?.includes("/api/auth/login")
) {
  return Promise.reject(error);
}

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .post(
            `${import.meta.env.VITE_API_BASE_URL}/api/auth/refreshToken`,
            {},
            { withCredentials: true }
          )
          .then((response) => {
            const token = response.data.accessToken;
            setAccessToken(token);
            return token;
          })
          .finally(() => {  
            refreshPromise = null;
          });
      }

      const newToken = await refreshPromise;

      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return apiInstance(originalRequest);
    } catch (refreshError) {
      setAccessToken(null);
      return Promise.reject(refreshError);
    }
  }
);

export default apiInstance;