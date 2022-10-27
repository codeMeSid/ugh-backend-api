import convict from "convict";

export const config = convict({
  PORT: {
    doc: "SERVER PORT",
    default: 4000,
    arg: "PORT",
    env: "PORT",
  },
  DOMAIN: {
    doc: "Domain for backend",
    default: "sb",
    arg: "DOMAIN",
    env: "DOMAIN",
  },
  LOG_LEVEL: {
    doc: "LOG LEVEL TYPE",
    default: "debug",
    arg: "LOG_LEVEL",
  },
  MONGO_URI: {
    doc: "Connection URI for Mongo DB",
    default:
      "mongodb+srv://siddhant:tAOdBjJMrQd97RbY@ugh.0clqp.mongodb.net/ugh-manager-sid",
    arg: "MONGO_URI",
    env: "MONGO_URI",
  },
  ENCRYPTION_KEY: {
    doc: "secret for authentication",
    default: "EF30AF027215E56C7EA776D36CAB269CDC4F1DD98B393DB445D14FC0B5001BC6",
    arg: "ENCRYPTION_KEY",
    env: "ENCRYPTION_KEY",
  },
  AGE_LIMIT: {
    doc: "Minimum age for users to register",
    default: 12,
    arg: "AGE_LIMIT",
    env: "AGE_LIMIT",
  },
  TWILIO_SID: {
    doc: "twilio sid",
    default: "AC41f1c477160f30840b39d8ccaa4fd7bf",
    arg: "TWILIO_SID",
    env: "TWILIO_SID",
  },
  TWILIO_AUTH: {
    doc: "twilio auth key",
    default: "edd84a568cc01f2e3afc65c91bc8a8ba",
    arg: "TWILIO_AUTH",
    env: "TWILIO_AUTH",
  },
  TWILIO_NUMBER: {
    doc: "twilio mobile number",
    default: "8087553363",
    arg: "TWILIO_NUMBER",
    env: "TWILIO_NUMBER",
  },
}).getProperties();
