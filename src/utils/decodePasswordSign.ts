import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";
import { config } from "../config";
const AScrypt = promisify(scrypt);

export const decodePasswordSign = async (
  password: string,
  signedPassword: string
) => {
  const [passwordHex, saltHex] = signedPassword.split(`.${config.DOMAIN}.`);
  const buffer: any = await AScrypt(password, saltHex, 8);
  return passwordHex === buffer.toString("hex");
};
