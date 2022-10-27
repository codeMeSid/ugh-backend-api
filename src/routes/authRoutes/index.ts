import { ApiRoute } from "../../types/ApiRoute";

import { registerUserRoute } from "./registerUserRoute";
import { loginUserRoute } from "./loginUserRoute";
import { generateOTPRoute } from "./generateOtpRoute";
import { verifyOTPRoute } from "./verifyOtpRoute";

// TODO get all ughIds to check
export const authRoutes: Array<ApiRoute> = [
  registerUserRoute,
  loginUserRoute,
  generateOTPRoute,
  verifyOTPRoute,
];
