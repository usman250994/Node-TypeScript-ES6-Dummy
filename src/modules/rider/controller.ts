import * as userService from "./service";
import vanillaController from "../../helpers/vanilla-controller";

export const personalDetail = (req, res) => (vanillaController(req, res, userService.personalDetail));
