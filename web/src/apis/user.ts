import { User } from "@/types/user";
import { baseApi } from "./base";

export interface AuthResponse {
  refresh: string;
  access: string;
  user: User;
}

export interface UserApiLoginVariables {
  email: string;
  password: string;
}

export interface UserApiRegisterVariables {
  email: string;
  password: string;
  name: string;
}

export const userApi = {
  login(variables: UserApiLoginVariables) {
    return baseApi.post<AuthResponse>("/api/user/login", variables);
  },
  register(variables: UserApiRegisterVariables) {
    return baseApi.post<AuthResponse>("/api/user/signup", variables);
  },
  getCurrentUser() {
    return baseApi.get<User>("/api/user");
  },
};
