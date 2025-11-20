import axios from "axios";

export const api = axios.create({
  baseURL: "/api", //MSW intercepts this
  headers: {
    "Content-Type": "application/json",
  },
});
