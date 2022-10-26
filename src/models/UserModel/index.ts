import dayjs from "dayjs";
import mongoose from "mongoose";
import { ModelCreator } from "..";
import { ID_PROOF } from "../../enums/ID_PROOF_LABEL";
import { SOCIAL_PLATFORM } from "../../enums/SOCIAL_PLATFORM";
import { STATUS } from "../../enums/STATUS";
import { TRANSACTION_EVENT } from "../../enums/TRANSACTION_EVENT";
import { TRANSACTION_TYPE } from "../../enums/TRANSACTION_TYPE";
import { USER_ROLES } from "../../enums/USER_ROLES";
import { WALLET } from "../../enums/WALLET";

interface UserAttrs {
  name: string;
  dob: Date;
  ughId: string;
  email: string;
  password: string;
  otp: number;
}
interface UserDoc {
  role: USER_ROLES;
  password: string;
  status: STATUS;
  idProofs: Array<{ name: string; label: ID_PROOF; value: string }>;
  specialId: string;
  profile: {
    name: string;
    dob: Date;
    ughId: string;
    imageSrc: string;
    email: string;
    mobile: string;
    socialPlatform: SOCIAL_PLATFORM;
    gamerTag: {
      psn: string;
      stream: string;
      twitch: string;
      discord: string;
    };
  };
  wallet: {
    [WALLET.COINS]: number;
    [WALLET.WINS]: number;
    [WALLET.SHOP]: number;
  };
  history: {
    // TODO replace with tournament model
    tournaments: Array<{
      info: any;
      position: number;
      winCoins: number;
      didWin: boolean;
    }>;
    // TODO replace with match model
    matches: Array<{
      info: any;
      against: any;
      points: number;
      didWin: boolean;
      dispute: {
        wasDisputed: boolean;
        disputedBy: string;
        didWin: boolean;
        proofSrc: string;
      };
    }>;
    transactions: Array<{
      coins: number;
      transactionId: string; // TODO replace with transaction model
      walletType: WALLET;
      transactionType: TRANSACTION_TYPE;
      transactionEvent: TRANSACTION_EVENT;
    }>;
  };
  verification: {
    account: {
      otp: number;
      otpExpireBy: Date;
    };
    passwordReset: {
      token: string;
      tokenExpireBy: Date;
    };
  };
  onDate: {
    lastUpdate: Date;
    [STATUS.ACTIVATED]: Date;
    [STATUS.BANNED]: Date;
    [STATUS.DELETED]: Date;
    [STATUS.INREVIEW]: Date;
    [STATUS.CREATED]: Date;
  };
}

const Users = new ModelCreator("users").create<UserAttrs, UserDoc>(
  {
    specialId: String,
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.PLAYER,
    },
    password: String,
    status: {
      type: String,
      enum: Object.values(STATUS),
      default: STATUS.CREATED,
    },
    idProofs: [
      {
        name: String,
        label: { type: String, enum: Object.values(ID_PROOF) },
        value: String,
      },
    ],
    profile: {
      name: String,
      dob: Date,
      ughId: String,
      imageSrc: String,
      email: String,
      mobile: String,
      socialPlatform: {
        type: String,
        enum: Object.values(SOCIAL_PLATFORM),
      },
      gamerTag: {
        psn: String,
        stream: String,
        twitch: String,
        discord: String,
      },
    },
    wallet: {
      coins: { type: Number, default: 0 },
      wins: { type: Number, default: 0 },
      shop: { type: Number, default: 0 },
    },
    onDate: {
      lastUpdate: { type: Date, default: new Date() },
      activated: Date,
      banned: Date,
      deleted: Date,
      "in-review": Date,
      created: { type: Date, default: new Date() },
    },
    verification: {
      account: {
        otp: Number,
        otpExpireBy: {
          type: Date,
          default: dayjs().add(15, "minutes").toDate(),
        },
      },
      passwordReset: {
        type: {
          token: String,
          tokenExpireBy: Date,
        },
      },
    },
    history: {
      transactions: [
        {
          coins: Number,
          transactionId: String,
          walletType: { type: String, enum: Object.values(WALLET) },
          transactionType: {
            type: String,
            enum: Object.values(TRANSACTION_TYPE),
          },
          transactionEvent: {
            type: String,
            enum: Object.values(TRANSACTION_EVENT),
          },
        },
      ],
      tournaments: [
        {
          info: { type: mongoose.SchemaTypes.ObjectId, ref: "TOURNAMENTS" },
          position: { type: Number, default: -1 },
          winCoins: { type: Number, default: 0 },
          didWin: { type: Boolean, default: false },
        },
      ],
      matches: [
        {
          info: { type: mongoose.SchemaTypes.ObjectId, ref: "MATCHES" },
          points: { type: Number, default: -1 },
          didWin: { type: Boolean, default: false },
          dispute: {
            type: {
              wasDisputed: { type: Boolean, default: false },
              disputedBy: String,
              didWin: { type: Boolean, default: false },
              proofSrc: String,
            },
          },
        },
      ],
    },
  },
  (attrs) => {
    const { name, dob, email, password, ughId, otp } = attrs;
    const data = {
      profile: { name, dob, email, ughId },
      password,
      verification: {
        account: { otp, otpExpireBy: dayjs().add(15, "minutes").toDate() },
      },
    };
    return data;
  }
);

export default Users;
