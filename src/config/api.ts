import axios, { AxiosInstance } from "axios";
import { API_URL, LOGIN_URL, REFRESH_TOKEN, SESSION_TOKEN } from "../const";

const BASE_URL = API_URL;
export const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    // PRODUCTION
    // baseURL: "/",
})

api.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem(SESSION_TOKEN);
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let isRefreshing = false;
let refreshSubscribers: any[] = [];

const subscribeTokenRefresh = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback);
};

const onTokenRefreshed = (newToken: any) => {
    refreshSubscribers.map((callback) => callback(newToken));
    refreshSubscribers = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry && error.response.data.rc === "003") {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    subscribeTokenRefresh(newToken => {
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        resolve(axios(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem(REFRESH_TOKEN);
                const response = await axios.get(`${BASE_URL}users/token/refresh`, {
                    headers: {
                        Authorization: "Bearer " + refreshToken
                    }
                });

                const resData = response.data.data;
                localStorage.setItem(SESSION_TOKEN, resData.accessToken);
                localStorage.setItem(REFRESH_TOKEN, resData.refreshToken);

                api.defaults.headers.Authorization = `Bearer ${resData.accessToken}`;
                onTokenRefreshed(resData.accessToken);

                return axios(originalRequest);
            } catch (refreshError: any) {
                console.error("Token refresh failed:", refreshError);
                localStorage.clear()
                window.location.href = LOGIN_URL
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);