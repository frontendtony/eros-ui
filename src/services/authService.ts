import environmentVariables from "@/config/environmentVariables";
import LoginResponseSchema from "@/schemas/LoginResponseSchema";
import customFetch from "@/utils/customFetch";

const baseUrl = environmentVariables.VITE_API_BASE_URL;

export const login = async (email: string, password: string) => {
  const response = await customFetch(`${baseUrl}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();

  return LoginResponseSchema.parse(json);
};
