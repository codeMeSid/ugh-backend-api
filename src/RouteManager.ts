import { Router } from "express";
import { config } from "./config";
import { ApiRoute } from "./types/ApiRoute";
import { Domain } from "./types/Domain";

export class RouteManager {
  private domains: Array<Domain> = [];
  private router = Router();
  registerDomain(domainName: string, apiRoutes: Array<ApiRoute>) {
    this.domains.push({ domainName, apiRoutes });
  }
  generateDomainRoutes() {
    this.domains.forEach((domain) => {
      const { domainName, apiRoutes } = domain;
      apiRoutes.forEach((apiRoute) => {
        const { url, method, middlewares, controller } = apiRoute;
        const constructedUrl = `/${domainName}${url}`;
        this.router[method](constructedUrl, ...middlewares, controller);
      });
    });
    return this.router;
  }
  getRouteData() {
    const data: Array<any> = [];
    this.domains.forEach((domain) => {
      const { domainName, apiRoutes } = domain;
      const domainRoutes: any = [];
      apiRoutes.forEach((apiRoute) => {
        const {
          url,
          method,
          doc: {
            text,
            responseStructure,
            queryParameters,
            requestBody,
            isProtected,
          },
        } = apiRoute;
        const constructedUrl = `/api/sb/${config.DOMAIN}/${domainName}${url}`;

        domainRoutes.push({
          url: constructedUrl,
          method,
          doc: text,
          isProtected,
          responseStructure: { success: true, result: responseStructure },
          queryParameters,
          requestBody,
        });
      });
      data.push({ domain: domainName, routes: domainRoutes });
    });
    return data;
  }
}
