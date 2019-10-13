import * as mongoose from "mongoose";
import { IRideRequest } from "../searchDriver/model";

export interface IRider extends mongoose.Document {
  OTP: number;
  mobileNumberVerified: boolean;
  createdAt: number;
  signUpStep: number;
  personalDetails: IPersonalDetails;
}

export interface IPersonalDetails {
  mobileNumber: number;
  userType: string;
  firstName: string;
  lastName: string;
  pin: string;
  gender: string;
  DOB: number;
  city: string;
  email: string;
}

const RiderSchema: mongoose.Schema = new mongoose.Schema({
  OTP: { type: Number, required: true },
  mobileNumberVerified: { type: Boolean, default: false },
  createdAt: { type: Number, default: new Date().getTime() / 1000 },
  signUpStep: { type: Number, default: 0 },
  personalDetails: {
    firstName: { type: String },
    lastName: { type: String },
    userType: { type: String, enum: ["driver", "rider"], required: true },
    mobileNumber: { type: Number, required: true },
    pin: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    DOB: { type: Number },
    city: { type: String, default: "Karachi" },
    email: { type: String, default: "" },
  }
});

export default mongoose.model<IRider>("Rider", RiderSchema);