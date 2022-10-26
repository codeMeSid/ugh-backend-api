import dayjs from "dayjs";
import { config } from "../../config";
import Users from "../../models/UserModel";
import { ApiRoute } from "../../types/ApiRoute";
import { generatorKey } from "../../utils/generateKey";
import { smsService } from "../../utils/SmsService";

// TODO get all ughIds to check
export const authRoutes: Array<ApiRoute> = [
  {
    url: "/register",
    method: "post",
    middlewares: [],
    controller: async (req, res) => {
      const { name, dob, email, ughId, mobile } = req.body;
      const dateOfBirth = dayjs(dob);
      if (dateOfBirth.diff(dayjs(), "years") >= config.AGE_LIMIT) {
        throw new Error(
          `User should be older than ${config.AGE_LIMIT} years old`
        );
      }
      let existingUser = await Users.findOne({
        $or: [
          { "profile.email": email },
          { "profile.ughId": ughId },
          { "profile.mobile": mobile },
        ],
      });
      if (existingUser) throw new Error("User already exists");
      const password = await generatorKey.signPassword(req.body.password);
      const newUserOtp = generatorKey.generateOTP();
      const newUser = Users.build({
        name,
        dob,
        email,
        password,
        ughId,
        otp: newUserOtp,
      });
      newUser.specialId = generatorKey.generateSpecialId("U-", newUser.id);
      await newUser.save();
      await smsService.sendOTP(mobile, newUserOtp);
      res.json({ specialId: newUser.specialId });
    },
    doc: {
      text: "To Register User and generate verification otp",
      requestBody: {
        name: "siddhant",
        dob: dayjs().subtract(20, "years").toDate(),
        ughId: "siddhant",
        email: "s@s.com",
        password: "siddhant",
        mobile: "7338766426",
      },
      responseStructure: {
        specialId: "string",
      },
    },
  },
];
