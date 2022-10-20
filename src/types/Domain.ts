import { ApiRoute } from "./ApiRoute";

export interface Domain {
  domainName: string;
  apiRoutes: Array<ApiRoute>;
}
