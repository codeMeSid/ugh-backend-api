import { Controller } from "../types/Controller";

export const responseInJson = (): Controller => (req, res, nextFunc) => {
  const resJson = res.json;
  res.json = function (data: any) {
    res.json = resJson;
    const success = !("success" in data);
    if (!success) {
      delete data.success;
      res.statusCode = 400;
    }
    return res.json({ success, result: data });
  };
  nextFunc();
};
