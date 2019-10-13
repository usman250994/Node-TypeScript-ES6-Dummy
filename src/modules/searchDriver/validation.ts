import { body, check } from "express-validator/check";
import { capitalize } from "../../helpers/utils";

export const searchDriver = () => ([
    check("city").exists().withMessage("Please select a city"),
    check("startLocation").isLatLong().exists().withMessage("Please select start location"),
    check("endLocation").isLatLong().exists().withMessage("Please select end location"),
    check("startTime").exists().withMessage("Please select start time"),
    check("endTime").exists().withMessage("Please select end time"),
]);

export const searchDriverAdv = () => ([
    check("city").exists().withMessage("Please select a city"),
    check("startLocation").isLatLong().exists().withMessage("Please select start location"),
    check("endLocation").isLatLong().exists().withMessage("Please select end location"),
    check("startTime").exists().withMessage("Please select start time"),
    check("endTime").exists().withMessage("Please select end time"),
    check("driverMobileNumber").exists().isNumeric().isLength({ min: 12, max: 12 })
    .withMessage("must be 12 digits number"),
]);

export const checkRideRequest = () => ([
    check("homeLocation").isLatLong().exists().withMessage("Please select home location"),
    check("officeLocation").isLatLong().exists().withMessage("Please select office location"),
    check("cityId").exists().withMessage("Invalid City ID"),
    check("homePickupTime").exists().withMessage("Please select start time"),
    check("officePickupTime").exists().withMessage("Please select end time"),
    check("driverId").exists().withMessage("Invalid Driver ID"),
    check("planSelection").exists().withMessage("Invalid plan selection"),
]);

export const confirmRideRequest = () => ([
    check("rideRequestId").exists().withMessage("Invalid RideRequest ID"),
]);
