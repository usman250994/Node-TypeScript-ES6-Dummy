import message from "../constants/messages";
import { validationResult } from "express-validator/check";

const vanillaController = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
        }
        const users = await next(req);
        return res.status(200).json({ status: 200, data: users, message: message.API_SUCCESSS });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

export default vanillaController;
