import { ListApiResponseSchema } from "@/schemas/api/ApiResponseSchemas";
import EstateSchema from "@/schemas/estate/EstateSchema";
import apiClient from "@/utils/apiClient";

export async function getEstates() {
  const res = await apiClient.get("/estates");

  const estates = ListApiResponseSchema(EstateSchema).parse(res.data);

  return estates.data;
}
