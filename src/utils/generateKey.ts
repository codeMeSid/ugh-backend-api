import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";
import { config } from "../config";
import ColorHash from "color-hash";
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
  generateOTP(power = 5) {
    const randNum = Math.random() * Math.pow(10, power);
    return Math.floor(randNum);
  }
  generateSpecialId(domain: string, id: string) {
    return domain + this.colorHash.hex(id).substring(1);
  }
}

export const generatorKey = new GeneratorKey();
