import { USER_ROLE } from "../../enums/USER_ROLE";
import { ApiRoute } from "../../types/ApiRoute";

export const testRoutes: Array<ApiRoute> = [
  {
    url: "/create-dummy-user",
    method: "get",
    middlewares: [],
    controller: () => {},
    doc: {
      text: "test api route to create user for testing",
      isProtected: true,
      responseStructure: {},
      queryParameters: {
        name: "string",
      },
    },
  },
];
