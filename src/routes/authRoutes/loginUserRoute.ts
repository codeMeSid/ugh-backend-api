import { ApiRoute } from "../../types/ApiRoute";
import Users from "../../models/UserModel";
import { generatorKey } from "../../utils/generateKey";

export const loginUserRoute: ApiRoute = {
  url: "/login",
  method: "post",
  middlewares: [],
  controller: async (req, res) => {
    const { ughId, password } = req.body;
    const user = await Users.findOne({ "profile.ughId": ughId });
    if (!user) throw new Error("User doesn't exists");
    const passwordAuthenticated = await generatorKey.decodeSignedPassword(
      password,
      user.password
    );
    if (!passwordAuthenticated) throw new Error("Invalid credentials");
    const signedKey = generatorKey.generateAuthSignedKey({
      ughId: user.profile.ughId,
      specialId: user.specialId,
    });
    res.json({
      userAuthKey: signedKey,
      userInfo: {
        ughId: user.profile.ughId,
        imageSrc: user.profile.imageSrc,
        specialId: user.specialId,
      },
    });
  },
  doc: {
    text: "api to login user",
    requestBody: { ughId: "siddhant", password: "siddhant" },
    responseStructure: {
      userAuthKey: "string",
      userInfo: {
        ughId: "string",
        imageSrc: "string",
        specialId: "string",
      },
    },
  },
};
