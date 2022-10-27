import { ApiRoute } from "../../types/ApiRoute";
import dayjs from "dayjs";
import { STATUS } from "../../enums/STATUS";
import Users from "../../models/UserModel";

export const verifyOTPRoute: ApiRoute = {
  url: "/verify/otp",
  method: "get",
  middlewares: [],
  controller: async (req, res) => {
    const { specialId, otp } = req.body;
    const user = await Users.findOne({ specialId });
    if (!user) throw new Error("User not found");
    if (user.status !== STATUS.CREATED)
      throw new Error(`User status: ${user.status}`);
    if (user.verification.account.otp !== parseInt(otp))
      throw new Error("Incorrect OTP");
    const currentDate = new Date().valueOf();
    const userOTPExpiry = user.verification.account.otpExpireBy.valueOf();
    if (currentDate > userOTPExpiry)
      throw new Error("OTP has expired, kindly generate new OTP");
    user.status = STATUS.ACTIVATED;
    await user.save();
    res.json({ message: "User Profile Actived" });
  },
  doc: {
    text: "api to verify otp",
    queryParameters: {
      specialId: "U-2D5C86-1795596",
      otp: 85147,
    },
    responseStructure: { message: "User Profile Actived" },
  },
};
