import { USER_ROLES } from "../enums/USER_ROLES";

export const apiTemplateController = (routes: any) => (req: any, res: any) =>
  res.render("api", {
    layout: false,
    routes,
    helpers: {
      json: function (data: any) {
        return JSON.stringify(data, null, 2);
      },
      getMethodColor: function (method: string) {
        let methodFill;
        switch (method) {
          case "get":
            methodFill = "success";
            break;
          case "post":
            methodFill = "warning";
            break;
          default:
            methodFill = "danger";
            break;
        }
        return methodFill;
      },
    },
  });
