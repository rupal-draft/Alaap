import axios from "axios";

const fastapi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_FASTAPI_SERVER_URL,
});

fastapi.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

fastapi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            if (typeof window !== "undefined") {
                window.localStorage.removeItem("user");
                window.localStorage.removeItem("token");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default fastapi;