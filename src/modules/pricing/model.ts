import * as mongoose from "mongoose";

export interface IPricing extends mongoose.Document {
    direction: string;
    carCategory: string;
    startingRate: number;
    ACPerKM: number;
    movingPerKM: number;
    above20KM: number;
}

const PricingSchema: mongoose.Schema = new mongoose.Schema({
    direction: { type: String },
    carCategory: { type: String },
    startingRate: { type: Number },
    ACPerKM: { type: Number },
    movingPerKM: { type: Number },
    above20KM: { type: Number },
});

export default mongoose.model<IPricing>("Pricing", PricingSchema);