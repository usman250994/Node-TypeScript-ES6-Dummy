import Rider, { IRider } from "../rider/model";
import * as jwt from "jsonwebtoken";

export const decodeJWTToken = (token) => (jwt.verify(token, process.env.JWT_SECRET_KEY));

export const authenticated = async (token) => {
    const { id, mobileNumber, userType }: any = decodeJWTToken(token);
    const result = await Rider.findOne(
        {
            "_id": id,
            "personalDetails.userType": userType,
            "personalDetails.mobileNumber": mobileNumber,
        }).select("_id").lean();
    return {
        result, decoded: { id, mobileNumber, userType },
    };
};

export const personalDetail = async (
    { headers, body: { firstName, lastName, gender, DOB, city, email } }) => {
    const { result, decoded: { mobileNumber: userNumber } } = await authenticated(headers.token);
    if (!result) {
        throw new Error("Forbidden");
    }
    const user: IRider = await Rider.findOneAndUpdate(
        {
            "personalDetails.mobileNumber": userNumber,
        },
        {
            $set:
            {
                "personalDetails.firstName": firstName,
                "personalDetails.lastName": lastName,
                "personalDetails.gender": gender,
                "personalDetails.DOB": DOB,
                "personalDetails.city": city,
                "personalDetails.email": email,
                "signUpStep": 1,
            },
        },
        {
            new: true,
            select: {
                "personalDetails.mobileNumber": true,
                "mobileNumberVerified": true,
                "personalDetails.userType": true,
                "_id": false,
                "personalDetails.firstName": true,
                "personalDetails.lastName": true,
                "personalDetails.gender": true,
                "personalDetails.DOB": true,
                "personalDetails.city": true,
                "personalDetails.email": true,
                "signUpStep": true,
            },
        },
    );
    return { user };
};
