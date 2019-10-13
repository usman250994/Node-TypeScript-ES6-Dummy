import * as Express from "express";
const router = Express.Router();
import * as user from "./controller";
import * as validate from "./validation";

router.post("/personalDetail", validate.personalDetail(), user.personalDetail);

module.exports = router;
