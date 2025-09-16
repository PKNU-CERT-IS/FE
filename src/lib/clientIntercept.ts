import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1",
  withCredentials: true, // 쿠키를 자동으로 포함
});

// 요청 인터셉터 설정 (예: 토큰 자동 첨부)
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshResponse = await axios.post(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"
          }/auth/token/refresh`,
          {},
          { withCredentials: true }
        );

        if (refreshResponse.status !== 200) {
          throw new Error("Failed to refresh token");
        }

        const newAccessToken = refreshResponse.data.data.accessToken;
        // 새로운 accessToken을 원래 요청에 첨부하고 재시도
        if (error.config && newAccessToken) {
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios.request(error.config);
        }
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        // 리프레시 실패 시 로그인 페이지로 리다이렉트 등 처리
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

apiClient.interceptors.request.use(
  (config) => {
    if (typeof document !== "undefined") {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
