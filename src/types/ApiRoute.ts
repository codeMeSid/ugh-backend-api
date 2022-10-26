import { Controller } from "./Controller";

export interface ApiRoute {
  url: string;

  method: "get" | "post" | "put" | "delete";
  middlewares: Array<Controller>;
  controller: Controller;
  doc: {
    text: string;
    isProtected?: boolean;
    requestBody?: Object;
    queryParameters?: Object;
    responseStructure?: Object;
  };
}
