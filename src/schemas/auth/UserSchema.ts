import { z } from "zod";

const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  isAdmin: z.boolean(),
  isEmailVerified: z.boolean(),
});

export default UserSchema;
