// Mocking Test
import { api } from "../client.js";
export const getProperties = async () => {
  const response = await api.get("/properties");
  return response.data;
};
