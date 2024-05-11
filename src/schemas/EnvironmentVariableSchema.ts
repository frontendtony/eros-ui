import { z } from "zod";

const EnvironmentVariablesSchema = z.object({
  VITE_API_BASE_URL: z.string(),
});

export default EnvironmentVariablesSchema;
