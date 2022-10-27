import dayjs from "dayjs";
import { STATUS } from "../../enums/STATUS";
import Users from "../../models/UserModel";
import { ApiRoute } from "../../types/ApiRoute";
import { generatorKey } from "../../utils/generateKey";
import { smsService } from "../../utils/SmsService";

export const generateOTPRoute: ApiRoute = {
  url: "/generate/otp",
  method: "get",
  middlewares: [],
  controller: async (req, res) => {
    const { specialId } = req.body;
    const user = await Users.findOne({ specialId });
    if (!user) throw new Error("User doesn't exist");
    if (user.status !== STATUS.CREATED)
      throw new Error(`User status: ${user.status}`);
    const newOTP = generatorKey.generateOTP();
    user.verification.account.otp = newOTP;
    user.verification.account.otpExpireBy = dayjs().add(15, "minutes").toDate();
    await user.save();
    //TODO add logger here
    await smsService.sendOTP(user.profile.mobile, newOTP);
    res.json({ message: "New OTP generated and sent to mobile" });
  },
  doc: {
    text: "api to generate and send new otp",
    queryParameters: { specialId: "U-2D5C86-1795596" },
    responseStructure: { message: "New OTP generated and sent to mobile" },
  },
};
