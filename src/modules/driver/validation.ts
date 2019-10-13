import { body, check } from "express-validator/check";
import { capitalize } from "../../helpers/utils";

export const registerPhone = () => ([
    check("mobileNumber").exists().isNumeric().isLength({ min: 12, max: 12 }).
        withMessage("Please enter a valid Phone Number"),
    check("userType").exists().isIn(["driver", "rider"]).withMessage("invalid user type")]
);

export const verifyUser = () => ([
    check("mobileNumber").exists().isNumeric().isLength({ min: 12, max: 12 }).withMessage("must be 12 digits number"),
    check("OTP").exists().isNumeric().isLength({ min: 4, max: 4 }).withMessage("must be exactly 4 digits")]
);

export const resendVerifyUserCode = () => ([
    check("mobileNumber").exists().isNumeric().isLength({ min: 12, max: 12 }).withMessage("must be 12 digits number")]
);

export const setPin = () => ([
    check("mobileNumber").exists().isNumeric().isLength({ min: 7, max: 12 }).
        withMessage("Please enter a valid Phone Number"),
    check("OTP").exists().isNumeric().isLength({ min: 4, max: 4 }).withMessage("invalid OTP"),
    check("pin").exists().isNumeric().isLength({ min: 4, max: 4 }).withMessage("must be exactly 4 digit"),
]);
export const personalDetail = () => ([
    check("firstName").exists().isLength({ min: 1, max: 25 }).matches(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-,])*$/).
        withMessage("firstName is required").customSanitizer((value) => capitalize(value)),
    check("lastName").exists().isLength({ max: 25 }).matches(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-,])*$/).
        withMessage("lastName is required").customSanitizer((value) => capitalize(value)),
    check("gender").exists().isIn(["male", "female"]).withMessage("gender is required"),
    check("DOB").exists().isNumeric().isLength({ min: 1, max: 10 }).withMessage("date is required"),
    check("email").exists().isEmail().normalizeEmail().withMessage("e-mail address is required"),
]);
export const identificationDetails = () => ([
    check("CNIC").exists().isLength({ min: 15, max: 15 }).
        matches(/^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/).withMessage("Please enter valid CNIC number"),
    check("DLA").exists().isIn(["Sindh", "Punjab", "KPK", "Balochistan"]).withMessage("Please Select your DLA"),
    check("profilePicture").exists().withMessage("Please upload your Picture"),
]);
export const bankDetails = () => ([
    check("bank").isIn([
        "Al Baraka Bank (Pakistan) Limited",
        "Allied Bank Limited",
        "Askari Bank Limited",
        "Bank Alfalah Limited",
        "Bank Al-Habib Limited",
        "Bankislami Pakistan Limited",
        "Dubai Islamic Bank Pakistan Limited",
        "Faysal Bank Limited",
        "First Women Bank Limited",
        "Habib Bank Limited",
        "Standard Chartered Bank (Pakistan) Limited",
        "Habib Metropolitan Bank Limited",
        "JS Bank Limited",
        "MCB Bank Limited",
        "MCB Islamic Bank Limited",
        "Meezan Bank Limited",
        "National Bank of Pakistan",
        "Samba Bank Limited",
        "Silk Bank Limited",
        "Sindh Bank Limited",
        "Soneri Bank Limited",
        "Summit Bank Limited",
        "The Bank of Khyber",
        "The Bank of Punjab",
        "United Bank Limited",
        ""]).withMessage("Pleasse Select Your Bank"),
    check("bankAccountNumber").isLength({ min: 0, max: 30 }).withMessage("Please Enter Your Account Number"),
]);
export const carDetailOne = () => ([
    check("licensePlateNumber").exists().isLength({ min: 1, max: 10 }).
        withMessage("Please Enter Your Car License Plate Number"),
    check("airConditioned").exists().isIn(["Yes", "No"]).withMessage("Is Your Car Air Conditioned"),
    check("vehicleRegistrationPaper").exists().withMessage("Please upload your Vehicle Registration Paper"),
]);
export const carDetailTwo = () => ([
    check("carImported").exists().isBoolean().withMessage("Is Your Car Imported?"),
    check("carName").optional().isString().isLength({ min: 1, max: 15 }).
        withMessage("Please Enter Your Car Name").customSanitizer((value) => capitalize(value)),
    check("carMake").optional().isLength({ min: 1, max: 15 }).
        withMessage("Please Select Your Car Make").customSanitizer((value) => capitalize(value)),
    check("carType").isIn(["Hatchback", "Sedan"]).withMessage("Please Select Car Type").custom(
        async (value, { req }) => {

            switch (value) {
                case "Hatchback":
                    if (req.body.carImported) {
                        return (req.body.carMake && req.body.carName);
                    } else {
                        return req.body.carName;
                    }
                default:
                    return (req.body.carMake && req.body.carName);
            }
        }),
    check("carModelYear").exists().isIn(["2001",
        "2002",
        "2003",
        "2004",
        "2005",
        "2006",
        "2007",
        "2008",
        "2009",
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020"]).withMessage("Please Select Car Model"),
    check("carColor").exists().withMessage("Please Select Car Color"),
]);
export const idCard = () => ([
    check("cnicFront").exists().withMessage("Pleasse upload picture of cnic front"),
    check("cnicBack").exists().withMessage("Pleasse upload picture of cnic back"),
    check("drivingLicenseFront").exists().withMessage("Pleasse upload picture of Driving License Front"),
    check("drivingLicenseBack").exists().withMessage("Pleasse upload picture of Driving License Back"),
]);
export const homeLocation = () => ([
    check("LatLong").exists().isLatLong().withMessage("Please enter valid Latitude/Longitude"),
    check("homeLocation").exists().withMessage("Please Enter Your Home Location").
        customSanitizer((value) => capitalize(value)),
]);

export const termsAndConditions = () => ([
    check("TC").isBoolean().withMessage("Please Accept Terms and Conditions"),
]);

export const dataUri = () => ([
    check("dataUri").exists().withMessage("Please upload a valid file"),
]);

// add params validation

export const searchDrivers = () => ([
    check("homeLocation").isLatLong().exists().withMessage("please select your pick up location"),
    check("direction").exists().isIn(["OTH", "HTO", "BOTH"]).withMessage("Please Enter Coorect Direction"),
    check("officeLocation").isLatLong().exists().withMessage("please select your drop off location"),
    check("city").exists().withMessage("please select city"),
    check("officeStartTime").isNumeric().exists().withMessage("please select your job start time"),
    check("officeEndTime").isNumeric().exists().withMessage("please select your job end time"),
    check("mobileNumber").optional().isNumeric().isLength({ min: 12, max: 12 }).withMessage("must be 12 digits number"),
    check("officeLocation").custom((officeLocation, { req }) => officeLocation !== req.query.homeLocation).withMessage("home and office location can not be same")
]);

export const driversTimeline = () => ([
    check("driverId").exists().withMessage("Please Select Directions"),
    check("direction").exists().isIn(["OTH", "HTO", "BOTH"]).withMessage("Please Enter Coorect Direction"),
    check("homeLocation").isLatLong().exists().withMessage("Please Send location"),
    check("officeLocation").isLatLong().exists().withMessage("Please Send location"),
    check("price").isNumeric().exists().withMessage("Please Send Price"),
    // check("day").isIn(["mon", "tue", "wed", "thu", "fri", "sat", "sun"]).exists()
    // .withMessage("Please Select Day correctly"),
]);
