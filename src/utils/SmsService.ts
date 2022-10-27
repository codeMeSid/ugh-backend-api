import Twilio from "twilio";
import { config } from "../config";

class SmsService {
  private twilio: Twilio.Twilio;
  constructor() {
    this.twilio = Twilio(config.TWILIO_SID, config.TWILIO_AUTH);
  }
  async sendOTP(to: string, otp: number) {
    if (!this.twilio) return; // TODO replace with error
    const smsParams = {
      to: "+91" + to,
      from: config.TWILIO_NUMBER,
      body: "Your UGH account verification code is: " + otp,
    };
    const smsPromise = new Promise((res, rej) => {
      return this.twilio.messages.create(smsParams, (error, item) => {
        if (error) rej(error.message);
        else if (item) res(item);
      });
    });
    return smsPromise;
  }
}

export const smsService = new SmsService();
