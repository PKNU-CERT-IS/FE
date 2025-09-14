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
        const refreshClient = axios.create({
          baseURL:
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1",
          withCredentials: true,
        });

        await refreshClient.post("/auth/refresh", {});
        // 서버에서 Set-Cookie로 새 토큰을 자동 설정한다고 가정

        // 원래 요청 재시도 (쿠키에서 새 토큰을 자동으로 읽어옴)
        if (error.config) {
          return apiClient.request(error.config);
        }
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
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
