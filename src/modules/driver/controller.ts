import * as userService from "./service";
import vanillaController from "../../helpers/vanilla-controller";

export const personalDetail = (req, res) => (vanillaController(req, res, userService.personalDetail));

export const identificationDetails = (req, res) => (vanillaController(req, res, userService.identificationDetails));

export const bankDetails = (req, res) => (vanillaController(req, res, userService.bankDetails));

export const carDetailsOne = (req, res) => (vanillaController(req, res, userService.carDetailsOne));

export const carDetailsTwo = (req, res) => (vanillaController(req, res, userService.carDetailsTwo));

export const idCard = (req, res) => (vanillaController(req, res, userService.idCard));

export const homeLocation = (req, res) => (vanillaController(req, res, userService.homeLocation));

export const getTermsAndConditions = (req, res) => (vanillaController(req, res, userService.getTermsAndConditions));

export const termsAndConditions = (req, res) => (vanillaController(req, res, userService.termsAndConditions));

export const uploadImage = (req, res) => (vanillaController(req, res, userService.uplaodImage));

export const searchDrivers = (req, res) => (vanillaController(req, res, userService.searchDrivers));

export const driversTimeline = (req, res) => (vanillaController(req, res, userService.driversTimeline));
