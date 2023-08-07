import { authInstance } from "./authInstance";
import { REFRESH_TOKEN_STORAGE_KEY } from "@/constants";

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
  const res = await authInstance.post("/refreshtoken", { refreshToken });
  const { accessToken } = res?.data;
  return accessToken;
};
