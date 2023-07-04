import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '@constants/service';
import { getAccessToken, getRefreshToken, isAccessTokenExpired, setToken } from '@utils/index';
import { refreshFetching } from './authServices';

const instance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const prevRequest = error.config;
        const statusCode = error.response.status || error.response.statusCode;

        if (statusCode === 401 && !prevRequest._retry) {
            prevRequest._retry = true;
            const refreshToken = getRefreshToken();

            if (!refreshToken) {
                return Promise.reject(error);
            }

            const isTokenExpired = isAccessTokenExpired();

            if (isTokenExpired) {
                try {
                    const response = await refreshFetching(refreshToken);
                    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
                        response.data;

                    setToken(newAccessToken, newRefreshToken);
                    prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    return instance(prevRequest);
                } catch (error) {
                    return Promise.reject(error);
                }
            }
        }
        return Promise.reject(error);
    },
);

export default instance;
