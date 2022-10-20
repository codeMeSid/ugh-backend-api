import { Controller } from "../types/Controller";

export const requestQueryToJson = (): Controller => (req, _, nextFunc) => {
  const query = req.query;
  const params = req.params;
  req.body = query;
  nextFunc();
};
