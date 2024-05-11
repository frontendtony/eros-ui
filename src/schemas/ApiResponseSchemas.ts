import { z } from "zod";

const ValidationErrorSchema = z.object({
  field: z.string(),
  errorMessage: z.string(),
});

const BaseApiResponseSchema = z.object({
  message: z.string().optional(),
  validationErrors: z.array(ValidationErrorSchema).optional(),
});

export function SingleApiResponseSchema<T extends z.ZodTypeAny>(schema: T) {
  return BaseApiResponseSchema.extend({
    data: schema,
  });
}

export function ListApiResponseSchema<T extends z.ZodTypeAny>(schema: T) {
  return BaseApiResponseSchema.extend({
    data: z.array(schema),
  });
}

export function PaginatedListApiResponseSchema<T extends z.ZodTypeAny>(
  schema: T
) {
  return BaseApiResponseSchema.extend({
    data: z.array(schema),
    pageSize: z.number(),
    pageNumber: z.number(),
    count: z.number(),
    totalPages: z.number(),
  });
}
