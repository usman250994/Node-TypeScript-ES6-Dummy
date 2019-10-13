import dbmodels, { ICity, IRideTiming, IRideRequest } from "./model";
import ridermodel, { IRider } from "../rider/model";
import drivermodel, { IDriver } from "../driver/model";

export const getAllCities = async () => {
    const cities = await dbmodels.City.find({ enabled: true });
    return cities;
};

export const getStartTiming = async () => {
    const timing = await dbmodels.RideTiming.find({ enabled: true, timeType: "Start" });
    return timing;
};

export const getEndTiming = async () => {
    const timing = await dbmodels.RideTiming.find({ enabled: true, timeType: "End" });
    return timing;
};

export const getCar = async () => {
    const cars = await dbmodels.Car.find();
    return cars;
};

export const searchDriver = async ({ headers,
    body: { city, LatLong, startLocation, startTime, endLocation, endTime } }) => {
    return "result";
};

export const searchDriverAdv = async ({ headers,
    body: { city, LatLong, startLocation, startTime, endLocation, endTime, driverMobileNumber } }) => {

    return "result";
};

export const checkRideRequest = async ({ decodedToken,
    body: { homeLocation, officeLocation, cityId, homePickupTime, officePickupTime, driverId, planSelection } }) => {

    const todayDate = new Date();
    // deleted on purpose 
    // this is just a dummy project
    // no business logic from the real project will be disclosed 
    //protecting privacy
};

export const confirmRideRequest = async ({ decodedToken,
    body: { rideRequestId } }) => {

    // deleted on purpose 
    // this is just a dummy project
    // no business logic from the real project will be disclosed 
    //protecting privacy
};
