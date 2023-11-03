import {
  ApiUserGetResponse,
  ApiUserLoginRequest,
  ApiUserLoginResponse,
  ApiUserSignupRequest,
  ApiUserSignupResponse,
} from "@/app/api/types";
import { baseApi } from "./base";

export const userApi = {
  login(variables: ApiUserLoginRequest) {
    return baseApi.POST<ApiUserLoginResponse>("/api/user/login", variables);
  },
  register(variables: ApiUserSignupRequest) {
    return baseApi.POST<ApiUserSignupResponse>("/api/user/signup", variables);
  },
  async getCurrentUser() {
    const res = await baseApi.GET<ApiUserGetResponse>("/api/user");
    return res.user;
  },
  logout() {
    return baseApi.POST("/api/user/logout");
  },
};
