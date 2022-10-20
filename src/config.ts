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
      "mongodb+srv://siddhant:tAOdBjJMrQd97RbY@ugh.0clqp.mongodb.net/ugh-manager",
    arg: "MONGO_URI",
    env: "MONGO_URI",
  },
  ENCRYPTION_KEY: {
    doc: "secret for authentication",
    default: "EF30AF027215E56C7EA776D36CAB269CDC4F1DD98B393DB445D14FC0B5001BC6",
    arg: "ENCRYPTION_KEY",
    env: "ENCRYPTION_KEY",
  },
}).getProperties();
