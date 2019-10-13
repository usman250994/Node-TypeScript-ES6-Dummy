import * as Express from "express";
const router = Express.Router();
import * as pricing from "./controller";

router.get("/", pricing.getAllPriceCategories);

module.exports = router;
