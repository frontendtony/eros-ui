import { SingleApiResponseSchema } from "@/schemas/ApiResponseSchemas";
import UserSchema from "@/schemas/auth/UserSchema";
import { z } from "zod";

const LoginResponseSchema = SingleApiResponseSchema(
  z.object({
    token: z.string(),
    user: UserSchema,
    expiresAt: z.string(),
  })
);

export default LoginResponseSchema;
