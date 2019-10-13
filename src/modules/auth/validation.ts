import { check } from "express-validator/check";

export const loginUser = () => ([
    check("pin").isNumeric().isLength({ min: 4, max: 4 }).withMessage("must be exactly 4 digit"),
    check("userType").isIn(["driver", "rider"]).withMessage("invalid user type"),
    check("mobileNumber").isNumeric().isLength({ min: 12, max: 12 }).withMessage("must be 12 digits number")]
);
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
