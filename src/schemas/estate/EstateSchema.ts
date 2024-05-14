import { z } from "zod";

const EstateSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
});

export default EstateSchema;
