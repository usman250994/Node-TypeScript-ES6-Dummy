import * as mongoose from "mongoose";
import { IRideRequest } from "../searchDriver/model";

export interface IDriver extends mongoose.Document {
  OTP: number;
  mobileNumberVerified: boolean;
  createdAt: number;
  CNIC: string;
  DLA: string;
  profilePicture: string;
  bank: string;
  bankAccountNumber: number;
  cnicFront: string;
  cnicBack: string;
  drivingLicenseFront: string;
  drivingLicenseBack: string;
  location: IGeoLocation;
  homeLocation: string;
  TC: boolean;
  review: number;
  signUpStep: number;
  personalDetails: IPersonalDetails;
  carDetails: ICarDetails;
  rides: IRidersPickUpAndDropOff[],
  officeLocation: IGeoLocation,
  officeStartTime: Number,
  officeEndTime: Number,
  riderOTH: Number,
  riderHTO: Number,
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

export interface ICarDetails {
  licensePlateNumber: string;
  airConditioned: string;
  vehicleRegistrationPaper: string;
  carType: string;
  carModelYear: number;
  carImported: boolean;
  carColor: string;
  carMake: string;
  carName: string;
  carCategory: string;
}

const DriverSchema: mongoose.Schema = new mongoose.Schema({
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
  },
  mobileNumberVerified: { type: Boolean, default: false },
  createdAt: { type: Number, default: new Date().getTime() / 1000 },
  OTP: { type: Number, required: true },
  CNIC: { type: String, default: "" },
  // Driving License Authority
  DLA: { type: String, enum: ["Sindh", "Punjab", "KPK", "Balochistan"] },
  profilePicture: { type: String, default: "" },
  bank: {
    type: String, enum: [
      "UBL Bank",
      ""], default: "",
  },
  bankAccountNumber: { type: Number },
  cnicFront: { type: String, default: "" },
  cnicBack: { type: String, default: "" },
  drivingLicenseFront: { type: String, default: "" },
  drivingLicenseBack: { type: String, default: "" },
  location: { type: Object, default: { type: "Point", coordinates: [0, 0] } },
  homeLocation: { type: String },
  TC: { type: Boolean, default: false },
  review: { type: Number, default: 0 },
  signUpStep: { type: Number, default: 0 },
  carDetails: {
    carCategory: { type: String, enum: ["Mini", "Go", "Go+"] },
    licensePlateNumber: { type: String, default: "" },
    airConditioned: { type: String, enum: ["Yes", "No"] },
    vehicleRegistrationPaper: { type: String, default: "" },
    carType: { type: String, enum: ["Hatchback", "Sedan"], default: "Sedan" },
    carModelYear: {
      type: Number, enum: [
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020], default: 2001,
    },
    carImported: { type: Boolean, default: false },
    carColor: { type: String, default: "" },
    carMake: { type: String, default: "" },
    carName: { type: String, default: "" },
  },
  rides: { type: [], default: [] },
  officeLocation: { type: Object, default: { type: "Point", coordinates: [0, 0] } },
  officeStartTime: { type: Number, default: null },
  officeEndTime: { type: Number, default: null },
  riderOTH: { type: Number, default: 0 },
  riderHTO: { type: Number, default: 0 },
});

DriverSchema.index({ location: "2dsphere" });
DriverSchema.index({ officeLocation: "2dsphere" });

export interface IRidersPickUpAndDropOff {
  id: string;
  pickUpLocation: IGeoLocation;
  dropOffLocation: IGeoLocation;
  pickUpTime: number;
  dropOfftime: number;
  gender: string;
  direction: { type: string, enum: ["bothWays", "HTO", "OTH"] };
}

export interface IGeoLocation {
  type: string;
  coordinates: number[];
}

export default mongoose.model<IDriver>("Driver", DriverSchema);
