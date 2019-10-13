import { Schema, Document, model } from "mongoose";
import { IRider } from "../rider/model";
import { IDriver, IGeoLocation } from "../driver/model";

export interface ICar extends Document {
  carName: string;
  carCategory: string;
}

const CarSchema = new Schema({
  carName: { type: String },
  carCategory: { type: String, enum: ["Mini", "Go", "Go+"] },
});

const Car = model<ICar>("Car", CarSchema);

export interface ICity extends Document {
  city: string;
  longitude: number;
  latitude: number;
  createdAt: number;
  isVisible : boolean;
  enabled: boolean;
}

const CitySchema: Schema = new Schema({
  city: { type: String },
  longitude: { type: Number },
  latitude: { type: Number },
  createdAt: { type: Number, default: new Date().getTime() / 1000 },
  isVisible: { type: Boolean, default: true },
  enabled: { type: Boolean, default: false },
});

const City = model<ICity>("City", CitySchema);

export interface IRideTiming extends Document {
  timeText: string;
  timeValue: number;
  timeType: string;
  createdAt: number;
  enabled: boolean;
}

const RideTimingSchema: Schema = new Schema({
  timeText: { type: String },
  timeValue: { type: Number },
  timeType: { type: String },
  createdAt: { type: Number, default: new Date().getTime() / 1000 },
  enabled: { type: Boolean, default: false },
});

const RideTiming = model<IRideTiming>("RideTiming", RideTimingSchema);

export interface IRideRequest extends Document {
  rider : IRider;
  driver : IDriver;
  city: ICity;
  startDateTime : number;
  homePickupTime : number;
  officePickupTime : number;
  homeLocation : IGeoLocation;
  officeLocation : IGeoLocation;
  plan : string;
  status : string;
  expiry: number;
  createdAt: number;
  enabled: boolean;
}

const RideRequestSchema: Schema = new Schema({
  rider : { type: Object , required: true },
  driver : { type: Object , required: true },
  city: { type: Object , required: true },
  startDateTime : { type: Number, default: new Date().getTime() / 1000  },
  homePickupTime : { type: Number, default: new Date().getTime() / 1000  },
  officePickupTime : { type: Number, default: new Date().getTime() / 1000 },
  homeLocation : { type: Object, default: { type: "Point", coordinates: [0, 0] }  },
  officeLocation : { type: Object, default: { type: "Point", coordinates: [0, 0] }  },
  plan : { type: String, enum: ["HTO", "OTH", "BOTH"], required: true },
  status : { type: String, enum: ["new","pending", "approved","rejected","canceled","sysrejected"] , required: true },
  expiry: { type: Number, default: (new Date().getTime() / 1000)+10800 },
  createdAt: { type: Number, default: new Date().getTime() / 1000 },
  enabled: { type: Boolean, default: false },
});

const RideRequest = model<IRideRequest>("RideRequest", RideRequestSchema);

export default { City, RideTiming, RideRequest, Car };
