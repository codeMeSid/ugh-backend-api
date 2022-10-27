import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";
import { config } from "../config";
import ColorHash from "color-hash";
import { sign, verify } from "jsonwebtoken";
const AScrypt = promisify(scrypt);

class GeneratorKey {
  private colorHash: ColorHash;
  constructor() {
    this.colorHash = new ColorHash();
  }
  async signPassword(password: string) {
    const salt = randomBytes(8);
    const buffer: any = await AScrypt(password, salt.toString("hex"), 8);
    const bufferStr = buffer?.toString("hex");
    const saltStr = salt?.toString("hex");
    return bufferStr + "." + config.DOMAIN + "." + saltStr;
  }
  async decodeSignedPassword(password: string, signedPassword: string) {
    const [passwordHex, saltHex] = signedPassword.split(`.${config.DOMAIN}.`);
    const buffer: any = await AScrypt(password, saltHex, 8);
    return passwordHex === buffer.toString("hex");
  }
  generateOTP(power = 5) {
    const randNum = Math.random() * Math.pow(10, power);
    return Math.floor(randNum);
  }
  generateSpecialId(domain: string, id: string) {
    const userColor = this.colorHash.hex(id).substring(1).toUpperCase();
    return domain + "-" + userColor + "-" + this.generateOTP(7);
  }
  generateAuthSignedKey(data: object): string {
    return sign(data, config.ENCRYPTION_KEY);
  }
  decodeAuthSignedKey(token: string): Object {
    return verify(token, config.ENCRYPTION_KEY);
  }
}

export const generatorKey = new GeneratorKey();
