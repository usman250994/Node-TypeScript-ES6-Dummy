import * as service from "./service";
import vanillaController from "../../helpers/vanilla-controller";

export const getDrivers = (req, res) => (vanillaController(req, res, service.getAllDrivers));

export const registerDriverPhone = (req, res) => (vanillaController(req, res, service.registerDriverPhone));

export const verifyDriver = (req, res) => (vanillaController(req, res, service.verifyDriver));

export const resendVerifyDriverCode = (req, res) => (vanillaController(req, res, service.resendVerifyDriverCode));

export const setDriverPin = (req, res) => (vanillaController(req, res, service.setDriverPin));

export const loginDriver = (req, res) => (vanillaController(req, res, service.loginDriver));

export const getRiders = (req, res) => (vanillaController(req, res, service.getAllRiders));

export const registerRiderPhone = (req, res) => (vanillaController(req, res, service.registerRiderPhone));

export const verifyRider = (req, res) => (vanillaController(req, res, service.verifyRider));

export const resendVerifyRiderCode = (req, res) => (vanillaController(req, res, service.resendVerifyRiderCode));

export const setRiderPin = (req, res) => (vanillaController(req, res, service.setRiderPin));

export const loginRider = (req, res) => (vanillaController(req, res, service.loginRider));

export const forgotDriverPassword = (req, res) => (vanillaController(req, res, service.forgotDriverPassword));

export const forgotRiderPassword = (req, res) => (vanillaController(req, res, service.forgotRiderPassword));
