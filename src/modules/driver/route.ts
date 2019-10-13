import * as Express from "express";
const router = Express.Router();
import * as user from "./controller";
import * as validate from "./validation";

router.post("/personalDetail", validate.personalDetail(), user.personalDetail);

router.post("/identificationDetails", validate.identificationDetails(), user.identificationDetails);

router.post("/bankDetails", validate.bankDetails(), user.bankDetails);

router.post("/carDetailsOne", validate.carDetailOne(), user.carDetailsOne);

router.post("/carDetailsTwo", validate.carDetailTwo(), user.carDetailsTwo);

router.post("/idCard", validate.idCard(), user.idCard);

router.post("/homeLocation", validate.homeLocation(), user.homeLocation);

router.get("/termsAndCondition", user.getTermsAndConditions);

router.post("/termsAndCondition", validate.termsAndConditions(), user.termsAndConditions);

router.post("/uploadImage", validate.dataUri(), user.uploadImage);

router.get("/searchDrivers", validate.searchDrivers(), user.searchDrivers);

router.get("/driversTimeline", validate.driversTimeline(), user.driversTimeline);

module.exports = router;
