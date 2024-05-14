import LoginResponseSchema from "@/schemas/LoginResponseSchema";
import apiClient from "@/utils/apiClient";

export const login = async (email: string, password: string) => {
  const response = await apiClient.post("auth/login", { email, password });

  return LoginResponseSchema.parse(response.data);
};
