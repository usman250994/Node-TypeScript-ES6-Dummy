import * as searchDriverService from "./service";
import vanillaController from "../../helpers/vanilla-controller";

export const getCities = (req, res) => (vanillaController(req, res, searchDriverService.getAllCities));

export const getStartTiming = (req, res) => (vanillaController(req, res, searchDriverService.getStartTiming));

export const getEndTiming = (req, res) => (vanillaController(req, res, searchDriverService.getEndTiming));

export const getCar = (req, res) => (vanillaController(req, res, searchDriverService.getCar));

export const searchDriver = (req, res) => (vanillaController(req, res, searchDriverService.searchDriver));

export const searchDriverAdv = (req, res) => (vanillaController(req, res, searchDriverService.searchDriverAdv));

export const checkRideRequest = (req, res) => (vanillaController(req, res, searchDriverService.checkRideRequest));

export const confirmRideRequest = (req, res) => (vanillaController(req, res, searchDriverService.confirmRideRequest));
