import Driver, { IDriver, IGeoLocation } from "./model";
import Car, { ICar } from "../searchDriver/model";
import * as jwt from "jsonwebtoken";
import axios from "axios";
import fileUpload from "../../helpers/upload-file-to-s3";
import { authenticated as riderauth } from "../rider/service";
import { getAllPriceCategories } from "../pricing/service";
import constants from "../../constants/misc";
import { isRegExp } from "util";

export const authenticated = async (token) => {
    const { id, mobileNumber, userType }: any = decodeJWTToken(token);
    const result = await Driver.findOne(
        {
            "_id": id,
            "personalDetails.userType": userType,
            "personalDetails.mobileNumber": mobileNumber,
        }).select("_id").lean();
    return {
        result, decoded: { id, mobileNumber, userType },
    };
};

export const decodeJWTToken = (token) => (jwt.verify(token, process.env.JWT_SECRET_KEY));

export const personalDetail = async (
    { headers, body: { firstName, lastName, gender, DOB, city, email } }) => {
    const { result, decoded: { mobileNumber: userNumber } } = await authenticated(headers.token);
    if (!result) {
        throw new Error("Forbidden");
    }
    const user: IDriver = await Driver.findOneAndUpdate(
        {
            "personalDetails.mobileNumber": userNumber,
        },
        {
            $set:
            {
                "personalDetails.firstName": firstName,
                "personalDetails.lastName": lastName,
                "personalDetails.gender": gender,
                "personalDetails.DOB": DOB,
                "personalDetails.city": city,
                "personalDetails.email": email,
                "signUpStep": 1,
            },
        },
        {
            new: true,
            select: {
                "personalDetails.mobileNumber": true,
                "mobileNumberVerified": true,
                "personalDetails.userType": true,
                "_id": false,
                "personalDetails.firstName": true,
                "personalDetails.lastName": true,
                "personalDetails.gender": true,
                "personalDetails.DOB": true,
                "personalDetails.city": true,
                "personalDetails.email": true,
                "signUpStep": true,
            },
        },
    );
    return { user };
};

export const identificationDetails = async ({ headers, body: { profilePicture: userProfileImage, CNIC, DLA } }) => {

    const { result, decoded: { mobileNumber: userNumber } } = await authenticated(headers.token);
    if (!result) {
        throw new Error("Forbidden");
    }
    const user: IDriver = await Driver.findOneAndUpdate(
        {
            "personalDetails.mobileNumber": userNumber,
        },
        {
            $set:
            {
                CNIC,
                DLA,
                profilePicture: userProfileImage,
                signUpStep: 2,
            },
        },
        {
            new: true,
            select: {
                "personalDetails.mobileNumber": true,
                "mobileNumberVerified": true,
                "personalDetails.userType": true,
                "_id": false,
                "personalDetails.firstName": true,
                "personalDetails.lastName": true,
                "personalDetails.gender": true,
                "personalDetails.DOB": true,
                "personalDetails.city": true,
                "personalDetails.email": true,
                "CNIC": true,
                "DLA": true,
                "profilePicture": true,
                "signUpStep": true,
            },
        },
    );
    return { user };
};
// from here
export const bankDetails = async ({ headers, body: { bank, bankAccountNumber } }) => {
    const { result, decoded: { mobileNumber: userNumber } } = await authenticated(headers.token);
    if (!result) {
        throw new Error("Forbidden");
    }
    const user: IDriver = await Driver.findOneAndUpdate(
        {
            "personalDetails.mobileNumber": userNumber,
        },
        {
            $set:
            {
                bank,
                bankAccountNumber,
                signUpStep: 3,
            },
        },
        {
            new: true,
            select: {
                "personalDetails.mobileNumber": true,
                "mobileNumberVerified": true,
                "personalDetails.userType": true,
                "_id": false,
                "personalDetails.firstName": true,
                "personalDetails.lastName": true,
                "personalDetails.gender": true,
                "personalDetails.DOB": true,
                "personalDetails.city": true,
                "personalDetails.email": true,
                "CNIC": true,
                "DLA": true,
                "profilePicture": true,
                "bank": true,
                "bankAccountNumber": true,
                "signUpStep": true,
            },
        },
    );
    return { user };
};

export const carDetailsOne = async ({ headers, body: { licensePlateNumber, airConditioned,
    vehicleRegistrationPaper: uservehicleRegistrationPaper } }) => {
    const { result, decoded: { mobileNumber: userNumber } } = await authenticated(headers.token);
    if (!result) {
        throw new Error("Forbidden");
    }
    const user: IDriver = await Driver.findOneAndUpdate(
        {
            "personalDetails.mobileNumber": userNumber,
        },
        {
            $set:
            {
                "carDetails.licensePlateNumber": licensePlateNumber,
                "carDetails.airConditioned": airConditioned,
                "carDetails.vehicleRegistrationPaper": uservehicleRegistrationPaper,
                "signUpStep": 4,
            },
        },
        {
            new: true,
            select: {
                "personalDetails.mobileNumber": true,
                "mobileNumberVerified": true,
                "personalDetails.userType": true,
                "_id": false,
                "personalDetails.firstName": true,
                "personalDetails.lastName": true,
                "personalDetails.gender": true,
                "personalDetails.DOB": true,
                "personalDetails.city": true,
                "personalDetails.email": true,
                "CNIC": true,
                "DLA": true,
                "profilePicture": true,
                "bank": true,
                "bankAccountNumber": true,
                "carDetails.licensePlateNumber": true,
                "carDetails.airConditioned": true,
                "carDetails.vehicleRegistrationPaper": true,
                "signUpStep": true,
            },
        },
    );
    return { user };
};

export const carDetailsTwo = async ({ headers, body: { carType, carModelYear, carColor,
    carImported, carMake, carName } }) => {
    const { result, decoded: { mobileNumber: userNumber } } = await authenticated(headers.token);
    if (!result) {
        throw new Error("Forbidden");
    }
    const car = carMake + " " + carName;
    let carCategory = "Go";
    if (carType === "Sedan") {
        carCategory = "Go+";
    } else {
        const cars = await Car.Car.find();
        for (const x of cars) {
            if (x.carName === car) {
                carCategory = x.carCategory;
            }
        }

    }
    const user: IDriver = await Driver.findOneAndUpdate(
        {
            "personalDetails.mobileNumber": userNumber,
        },
        {
            $set:
            {
                "carDetails.carType": carType,
                "carDetails.carModelYear": carModelYear,
                "carDetails.carColor": carColor,
                "carDetails.carImported": carImported,
                "carDetails.carMake": carMake,
                "carDetails.carName": carName,
                "carDetails.carCategory": carCategory,
                "signUpStep": 5,
            },
        },
        {
            new: true,
            select: {
                "personalDetails.mobileNumber": true,
                "personalDetails.mobileNumberVerified": true,
                "personalDetails.userType": true,
                "_id": false,
                "personalDetails.firstName": true,
                "personalDetails.lastName": true,
                "personalDetails.gender": true,
                "personalDetails.DOB": true,
                "personalDetails.city": true,
                "personalDetails.email": true,
                "CNIC": true,
                "DLA": true,
                "profilePicture": true,
                "bank": true,
                "bankAccountNumber": true,
                "carDetails.licensePlateNumber": true,
                "carDetails.airConditioned": true,
                "carDetails.vehicleRegistrationPaper": true,
                "carDetails.carType": true,
                "carDetails.carModelYear": true,
                "carDetails.carColor": true,
                "carDetails.carImported": true,
                "carDetails.carMake": true,
                "carDetails.carName": true,
                "carDetails.carCategory": true,
                "signUpStep": true,
            },
        },
    );
    return { user };
};

export const idCard = async ({ headers,
    body: { cnicFront: cF, cnicBack: cB, drivingLicenseFront: dlF, drivingLicenseBack: dlB } }) => {
    const { result, decoded: { mobileNumber: userNumber } } = await authenticated(headers.token);
    if (!result) {
        throw new Error("Forbidden");
    }

    const user: IDriver = await Driver.findOneAndUpdate(
        {
            "personalDetails.mobileNumber": userNumber,
        },
        {
            $set:
            {
                cnicFront: cF,
                cnicBack: cB,
                drivingLicenseFront: dlF,
                drivingLicenseBack: dlB,
                signUpStep: 6,
            },
        },
        {
            new: true,
            select: {
                "personalDetails.mobileNumber": true,
                "mobileNumberVerified": true,
                "personalDetails.userType": true,
                "_id": false,
                "personalDetails.firstName": true,
                "personalDetails.lastName": true,
                "personalDetails.gender": true,
                "personalDetails.DOB": true,
                "personalDetails.city": true,
                "personalDetails.email": true,
                "CNIC": true,
                "DLA": true,
                "profilePicture": true,
                "bank": true,
                "bankAccountNumber": true,
                "carDetails.licensePlateNumber": true,
                "carDetails.airConditioned": true,
                "carDetails.vehicleRegistrationPaper": true,
                "carDetails.carType": true,
                "carDetails.carModelYear": true,
                "carDetails.carColor": true,
                "carDetails.carImported": true,
                "carDetails.carMake": true,
                "carDetails.carName": true,
                "carDetails.carCategory": true,
                "cnicFront": true,
                "cnicBack": true,
                "drivingLicenseFront": true,
                "drivingLicenseBack": true,
                "signUpStep": true,
            },
        },
    );
    return { user };
};

export const homeLocation = async ({ headers, body: { LatLong, homeLocation: hL } }) => {
    const { result, decoded: { mobileNumber: userNumber } } = await authenticated(headers.token);
    const latLongArr = LatLong.split(",");
    const DriverGeoLocation: IGeoLocation
        = { type: "Point", coordinates: [parseFloat(latLongArr[1]), parseFloat(latLongArr[0])] };
    if (!result) {
        throw new Error("Forbidden");
    }

    const user: any = await Driver.findOneAndUpdate(
        {
            "personalDetails.mobileNumber": userNumber,
        },
        {
            $set:
            {
                location: DriverGeoLocation,
                homeLocation: hL,
                signUpStep: 7,
            },
        }, {
        new: true,
        select: {
            "personalDetails.mobileNumber": true,
            "mobileNumberVerified": true,
            "personalDetails.userType": true,
            "_id": false,
            "personalDetails.firstName": true,
            "personalDetails.lastName": true,
            "personalDetails.gender": true,
            "personalDetails.DOB": true,
            "personalDetails.city": true,
            "personalDetails.email": true,
            "CNIC": true,
            "DLA": true,
            "profilePicture": true,
            "bank": true,
            "bankAccountNumber": true,
            "carDetails.licensePlateNumber": true,
            "carDetails.airConditioned": true,
            "carDetails.vehicleRegistrationPaper": true,
            "carDetails.carType": true,
            "carDetails.carModelYear": true,
            "carDetails.carColor": true,
            "carDetails.carImported": true,
            "carDetails.carMake": true,
            "carDetails.carName": true,
            "carDetails.carCategory": true,
            "cnicFront": true,
            "cnicBack": true,
            "drivingLicenseFront": true,
            "drivingLicenseBack": true,
            "location": true,
            "homeLocation": true,
            "signUpStep": true,
        },
    },
    );

    return { user };
};

export const getTermsAndConditions = async ({ headers }) => {
    const { result, decoded: { mobileNumber: userNumber } } = await authenticated(headers.token);
    if (!result) {
        throw new Error("Forbidden");
    }
    const user = await Driver.findOneAndUpdate(
        {
            "personalDetails.mobileNumber": userNumber,
        },
        {
            new: true,
            select: {
                "personalDetails.mobileNumber": true,
                "mobileNumberVerified": true,
                "personalDetails.userType": true,
                "_id": false,
                "personalDetails.firstName": true,
                "personalDetails.lastName": true,
                "personalDetails.gender": true,
                "personalDetails.DOB": true,
                "personalDetails.city": true,
                "personalDetails.email": true,
                "CNIC": true,
                "DLA": true,
                "profilePicture": true,
                "bank": true,
                "bankAccountNumber": true,
                "carDetails.licensePlateNumber": true,
                "carDetails.airConditioned": true,
                "carDetails.vehicleRegistrationPaper": true,
                "carDetails.carType": true,
                "carDetails.carModelYear": true,
                "carDetails.carColor": true,
                "carDetails.carImported": true,
                "carDetails.carMake": true,
                "carDetails.carName": true,
                "carDetails.carCategory": true,
                "cnicFront": true,
                "cnicBack": true,
                "drivingLicenseFront": true,
                "drivingLicenseBack": true,
                "location": true,
                "homeLocation": true,
                "signUpStep": true,
                "TC": true,
            },
        },
    );
    return { user };
};

export const termsAndConditions = async ({ headers, body: { TC } }) => {
    const { result, decoded: { mobileNumber: userNumber } } = await authenticated(headers.token);
    if (!result) {
        throw new Error("Forbidden");
    }
    if (!TC) {
        throw new Error("Please Accept Terms and Conditions");
    }
    const user: IDriver = await Driver.findOneAndUpdate(
        {
            "personalDetails.mobileNumber": userNumber,
        },
        {
            $set:
            {
                TC,
                signUpStep: 8,
            },
        },
        {
            new: true,
            select: {
                "personalDetails.mobileNumber": true,
                "mobileNumberVerified": true,
                "personalDetails.userType": true,
                "_id": false,
                "personalDetails.firstName": true,
                "personalDetails.lastName": true,
                "personalDetails.gender": true,
                "personalDetails.DOB": true,
                "personalDetails.city": true,
                "personalDetails.email": true,
                "CNIC": true,
                "DLA": true,
                "profilePicture": true,
                "bank": true,
                "bankAccountNumber": true,
                "carDetails.licensePlateNumber": true,
                "carDetails.airConditioned": true,
                "carDetails.vehicleRegistrationPaper": true,
                "carDetails.carType": true,
                "carDetails.carModelYear": true,
                "carDetails.carColor": true,
                "carDetails.carImported": true,
                "carDetails.carMake": true,
                "carDetails.carName": true,
                "carDetails.carCategory": true,
                "cnicFront": true,
                "cnicBack": true,
                "drivingLicenseFront": true,
                "drivingLicenseBack": true,
                "location": true,
                "homeLocation": true,
                "signUpStep": true,
                "TC": true,
            },
        },
    );
    return { user };
};

export const uplaodImage = async ({ headers, body: { dataUri } }) => {
    const { result } = await authenticated(headers.token);
    if (!result) {
        throw new Error("Forbidden");
    }
    return await fileUpload(dataUri);
};

export const searchDrivers = async (req) => {
    // deleted on purpose 
    // this is just a dummy project
    // no business logic from the real project will be disclosed 
    //protecting privacy
};

export const driversTimeline = async () => {
    // deleted on purpose 
    // this is just a dummy project
    // no business logic from the real project will be disclosed 
    //protecting privacy
};

// local/unexported functions below
// some of these functons will move to pricing module later
// ofcourse this can be more optimized,
// for now there are only functional requirements complete

const originsAndDestinationsMatrix = (FilteredDrivers: IDriver[], lat, lon) => {
    const first25: IDriver[] = FilteredDrivers.splice(0, 25);
    let matrix = "origins=";
    for (const { location: { coordinates } } of first25) {
        matrix += coordinates[1] + "," + coordinates[0] + "|";
    }
    matrix = matrix.slice(0, -1);
    matrix += "&destinations=" + lat + "," + lon;
    if (!FilteredDrivers.length) {
        return [matrix];
    } else {
        // if for suppose the drivers are more than 25
        // this code block is incomplete here
        // will complete it soon
        return originsAndDestinationsMatrix(FilteredDrivers, lat, lon);
    }
};

const reduceDriversToNine = (drivers) => {
    const go = [];
    const goPlus = [];
    const goMini = [];
    for (const driverObj of drivers) {
        if (driverObj.driver.carCategory === "Mini") {
            goMini.push(driverObj);
        } else if (driverObj.driver.carCategory === "Go+") {
            goPlus.push(driverObj);
        } else {
            go.push(driverObj);
        }
    }
    goMini.sort((a, b) => a.pickUpdistance - b.pickUpdistance);
    goPlus.sort((a, b) => a.pickUpdistance - b.pickUpdistance);
    go.sort((a, b) => a.pickUpdistance - b.pickUpdistance);

    return addToNine(goMini, go, goPlus);
};

const includePrice = async (drivers, direction) => {
    // deleted on purpose 
    // this is just a dummy project
    // no business logic from the real project will be disclosed 
    //protecting privacy
};

const priceCalculation = (distance, { ACPerKM, movingPerKM, startingRate, above20KM }) => {
    if (distance > 220) {
        return startingRate + (ACPerKM * 440) + (movingPerKM * 440) + (above20KM * (distance - 220));
    } else {
        return startingRate + (ACPerKM * distance) + (movingPerKM * distance);
    }
};

const addToNine = (goMini, go, goPlus) => {
    let drivers = [];
    while (drivers.length < 9) {
        drivers = [...drivers, ...goMini.slice(0, 3)];
        drivers = [...drivers, ...go.slice(0, 3)];
        drivers = [...drivers, ...goPlus.slice(0, 3)];
    }
    return drivers;

};

const convertIntoKm = (distance) => ((distance / 1000).toString());

const retrieveDistanceMatricesResponse = async (matrixes) => {
    let rows = [];
    for (const matrix of matrixes) {
        const resp: any
            = await axios.get(process.env.DISTANCE_MATRIX_API + matrix + "&key=" + process.env.GOOGLE_API_KEY);
        // every time api hits, and returns distance matrix of given origins and destination
        // we store that in a single array. later for parsing
        rows = [...rows, ...resp.data.rows];
    }
    return rows = rows.map((row) => {
        return row.elements[0];
    });
};

const getRouteDistance = async (riderHomeLocation, riderOfficeLocation) => (
    await axios.get(process.env.DISTANCE_MATRIX_API +
        "origins=" + riderHomeLocation + "|" + riderOfficeLocation +
        "&destinations=" + riderOfficeLocation + "|" + riderHomeLocation + "&key=" + process.env.GOOGLE_API_KEY);
);

const filterDriversByDistance = (dist, rows, drivers) => {
    let driversFiltered = [];
    for (const [index, element] of rows.entries()) {
        if (element.distance.value <= 3000) {
            driversFiltered.push({
                driver: drivers[index],
                pickUpdistance: element.distance.text,
                HTO: convertIntoKm(dist.data.rows[0].elements[0].distance.value),
                OTH: convertIntoKm(dist.data.rows[1].elements[1].distance.value),
            });
        }
    }
    if (driversFiltered.length > 9) {
        driversFiltered = [...reduceDriversToNine(driversFiltered)];
    }
    return driversFiltered;
};

const getWeekdays = (day) => {
    // deleted on purpose 
    // this is just a dummy project
    // no business logic from the real project will be disclosed 
    //protecting privacy
};

const calculatePrice = (day, price) => {
    // deleted on purpose 
    // this is just a dummy project
    // no business logic from the real project will be disclosed 
    //protecting privacy
};

const getWaypoints = (rides) => {
    // deleted on purpose 
    // this is just a dummy project
    // no business logic from the real project will be disclosed 
    //protecting privacy
};

const googleRoutePath = async (picks, drops, home, office, direction) => {
    // deleted on purpose 
    // this is just a dummy project
    // no business logic from the real project will be disclosed 
    //protecting privacy
};

const getOriginAndDestination = (home, office, direction) => {
    // deleted on purpose 
    // this is just a dummy project
    // no business logic from the real project will be disclosed 
    //protecting privacy
};
const extractPersonalizedRoutefromGoogleRoute = (googleRoute, drivingType) => {
    const points = [];
    let tripTime: number = 0;
    for (let i = 0; i < googleRoute.length - 1; i++) {
        tripTime += googleRoute[i].duration.value;
        points.push({
            distance: googleRoute[i].distance.value,
            duration: googleRoute[i].duration.value,
            endAddress: googleRoute[i].end_address,
            endLocation: googleRoute[i].end_location,
            startAddress: googleRoute[i].start_address,
            startLocation: googleRoute[i].start_location,
            direction: drivingType,
        });
    }
    tripTime += googleRoute[googleRoute.length - 1].duration.value;
    return { points, tripTime };
};

const getMongoCoordsArrayFromInputCoords = (cords) => {
    const cord = cords.toString().split(",").reverse();
    return [parseFloat(cord[0]), parseFloat(cord[1])];
};
