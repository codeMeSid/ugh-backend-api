import { ApiRoute } from "../../types/ApiRoute";

export const testRoutes: Array<ApiRoute> = [
  {
    url: "/health-check",
    method: "get",
    middlewares: [],
    controller: (req, res) => {
      res.json({ msg: "Healthy Api" });
    },
    doc: {
      responseStructure: { msg: "string" },
      text: "Just a health check api",
    },
  },
];
