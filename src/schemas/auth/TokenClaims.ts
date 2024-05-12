import { z } from "zod";

const EstateRole = z.object({
  RoleId: z.string(),
  Permissions: z.array(z.string()),
});

const EstateRoles = z.record(z.string(), EstateRole);

const EstateRolesStringToJsonSchema = z
  .string()
  .transform((str, ctx): z.infer<typeof EstateRoles> => {
    try {
      return JSON.parse(str);
    } catch (e) {
      ctx.addIssue({ code: "custom", message: "Invalid JSON" });
      return z.NEVER;
    }
  });

const TokenClaims = z.object({
  sub: z.string(),
  jti: z.string(),
  iat: z.string(),
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier":
    z.string(),
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": z.string(),
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress":
    z.string(),
  IsAdmin: z.string(),
  EstateRoles: EstateRolesStringToJsonSchema,
  exp: z.number(),
  iss: z.string(),
  aud: z.string(),
});

export default TokenClaims;
