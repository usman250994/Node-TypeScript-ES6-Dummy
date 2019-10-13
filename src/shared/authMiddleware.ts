import * as jwt from "jsonwebtoken";
import Rider, { IRider } from "../modules/rider/model";
import Driver, { IDriver } from "../modules/driver/model";
export const createJWTToken = (value) => (jwt.sign(value, process.env.JWT_SECRET_KEY));

/**
 *
 * @param {string} url
 * @param {[]} whiteListUrls
 */
function urlIsInWhitelist(url, whiteListUrls) {
    for (var i = 0; i < whiteListUrls.length; i++) {
        if (url.startsWith(whiteListUrls[i])) {
            return true;
        }
    }
    return false;
}

export const getAuthMiddleware = (whiteListUrls) => {
    return async (req, res, next) => {
        try {
            // We skip authorization if the requested url is in whitelist or if
            // the request method is OPTIONS.
            if (urlIsInWhitelist(req.url, whiteListUrls) || req.method === "OPTIONS") {
                return next();
            }

            if (!req.headers.token) {
                return res.status(401).json({
                    message: `No Authorization header ${req.url}`,
                });
            }

            const token = req.headers.token;
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            if (decoded && decoded.userType === "rider") {
                const riderResult = await Rider.findOne(
                    {
                        "_id": decoded.id,
                        "personalDetails.userType": decoded.userType,
                        "personalDetails.mobileNumber": decoded.mobileNumber,
                    }).select("_id").lean();

                if (riderResult != null) {
                    req.userData = riderResult;
                    req.decodedToken = decoded;
                    return next();
                } else {
                    return res.status(401).json({
                        message: `Invalid Authorization header ${req.url}`,
                    });
                }
            } else {
                if (decoded && decoded.userType === "driver") {
                    const driverResult = await Driver.findOne(
                        {
                            "_id": decoded.id,
                            "personalDetails.userType": decoded.userType,
                            "personalDetails.mobileNumber": decoded.mobileNumber,
                        }).select("_id").lean();

                    if (driverResult != null) {
                        req.userData = driverResult;
                        req.decodedToken = decoded;
                        return next();
                    } else {
                        return res.status(401).json({
                            message: `Invalid Authorization header ${req.url}`,
                        });
                    }
                } else {
                    return res.status(401).json({
                        message: `Invalid Authorization header ${req.url}`,
                    });
                }
            }

        } catch (err) {
            console.log("***Auth Failed***", err);
            return res.status(401).json({
                message: `Auth failed for ${req.url}`,
            });
        }
    };
};
