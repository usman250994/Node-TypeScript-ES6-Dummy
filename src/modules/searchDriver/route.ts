import * as Express from "express";
const router = Express.Router();
import * as searchDriverCont from "./controller";
import * as validate from "./validation";

// get all city
router.get("/getCities", searchDriverCont.getCities);

// get start timing
router.get("/getStartTiming", searchDriverCont.getStartTiming);

// get end timing
router.get("/getEndTiming", searchDriverCont.getEndTiming);

// get car
router.get("/getCar", searchDriverCont.getCar);

// post search driver
router.post("/searchDriver", validate.searchDriver(), searchDriverCont.searchDriver);

// post search Driver Advance
router.post("/searchDriverAdv", validate.searchDriverAdv(), searchDriverCont.searchDriverAdv);

// post check ride request
router.post("/checkRideRequest", validate.checkRideRequest(), searchDriverCont.checkRideRequest);

// post confirm ride request
router.post("/confirmRideRequest", validate.confirmRideRequest(), searchDriverCont.confirmRideRequest);

module.exports = router;
