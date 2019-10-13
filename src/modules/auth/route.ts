import * as Express from "express";
const router = Express.Router();
import * as auth from "./controller";
import * as validate from "./validation";

router.get("/driver/", auth.getDrivers);

router.post("/driver/registerPhone", validate.registerPhone(), auth.registerDriverPhone);

router.post("/driver/verifyUser", validate.verifyUser(), auth.verifyDriver);

router.post("/driver/resendCode", validate.resendVerifyUserCode(), auth.resendVerifyDriverCode);

router.post("/driver/setPin", validate.setPin(), auth.setDriverPin);

router.post("/driver/loginUser", validate.loginUser(), auth.loginDriver);

router.get("/rider/", auth.getRiders);

router.post("/rider/registerPhone", validate.registerPhone(), auth.registerRiderPhone);

router.post("/rider/verifyUser", validate.verifyUser(), auth.verifyRider);

router.post("/rider/resendCode", validate.resendVerifyUserCode(), auth.resendVerifyRiderCode);

router.post("/rider/setPin", validate.setPin(), auth.setRiderPin);

router.post("/rider/loginUser", validate.loginUser(), auth.loginRider);

router.post("/driver/forgotPassword", validate.registerPhone(), auth.forgotDriverPassword);

router.post("/rider/forgotPassword", validate.registerPhone(), auth.forgotRiderPassword);

module.exports = router;
