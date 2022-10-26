import Twilio from "twilio";
import { config } from "../config";

class SmsService {
  private twilio: Twilio.Twilio;
  constructor() {
    this.twilio = Twilio(config.TWILIO_SID, config.TWILIO_AUTH);
  }
  sendOTP(to: string, otp: number) {
    if (!this.twilio || process.env.NODE_ENV !== "production") return; // TODO replace with error
    const smsParams = {
      to: "+91" + to,
      from: config.TWILIO_NUMBER,
      body: "Your UGH account verification code is: " + otp,
    };
    return this.twilio.messages.create(smsParams);
  }
}

export const smsService = new SmsService();
