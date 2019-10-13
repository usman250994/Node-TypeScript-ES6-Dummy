import { body, check } from "express-validator/check";
import { capitalize } from "../../helpers/utils";

export const personalDetail = () => ([
    check("firstName").exists().isLength({ min: 1, max: 25 }).matches(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-,])*$/).
        withMessage("firstName is required").customSanitizer((value) => capitalize(value)),
    check("lastName").exists().isLength({ max: 25 }).matches(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-,])*$/).
        withMessage("lastName is required").customSanitizer((value) => capitalize(value)),
    check("gender").exists().isIn(["male", "female"]).withMessage("gender is required"),
    check("DOB").exists().isNumeric().isLength({ min: 1, max: 10 }).withMessage("date is required"),
    check("email").exists().isEmail().normalizeEmail().withMessage("e-mail address is required"),
]);
