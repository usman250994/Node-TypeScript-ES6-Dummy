import * as pricingService from "./service";
import vanillaController from "../../helpers/vanilla-controller";

export const getAllPriceCategories = (req, res) => (vanillaController(req, res, pricingService.getAllPriceCategories));