import { Controller } from "../types/Controller";

export const requestQueryToJson = (): Controller => (req, _, nextFunc) => {
  const query = req.query;
  if (req.method.toLowerCase() === "get") req.body = query;
  nextFunc();
};
