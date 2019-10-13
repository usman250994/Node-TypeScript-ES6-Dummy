import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import Driver, { IDriver } from "../driver/model";
import Rider, { IRider } from "../rider/model";
import { generateHash } from "../../helpers/utils";
import axios from "axios";
import httpRequests from "../../constants/http-requests";
import messages from "../../constants/messages";

export const createJWTToken = (value) => (jwt.sign(value, process.env.JWT_SECRET_KEY));

const sendOTP = async (userNumber: number) => {
    const otp: number = Math.floor(999 + Math.random() * 9000);
    const { status, data }: any = await axios.post(httpRequests.SMS_API,
        { mobileNumber: userNumber, OTP: messages.OTP_MESSSAGE + otp });
    return { status, data, otp };
};

const createBasicDriver = async (userNumber, otp, type) => {
    const newUser: IDriver = new Driver({
        OTP: otp,
        personalDetails: {
            mobileNumber: userNumber,
            userType: type,
        },
    });
    const createdDriver: IDriver = await newUser.save();
    return {
        user: {
            mobileNumber: createdDriver.personalDetails.mobileNumber,
            mobileNumberVerified: createdDriver.mobileNumberVerified,
            userType: createdDriver.personalDetails.userType,
        },
    };
};

const createBasicRider = async (userNumber, otp, type) => {
    const newUser: IRider = new Rider({
        OTP: otp,
        personalDetails: {
            mobileNumber: userNumber,
            userType: type,
        },
    });
    const createdRider: IRider = await newUser.save();
    return {
        user: {
            mobileNumber: createdRider.personalDetails.mobileNumber,
            mobileNumberVerified: createdRider.mobileNumberVerified,
            userType: createdRider.personalDetails.userType,
        },
    };
};

const updateDriverOTP = async (userNumber, otp) => {
    return {
        // why are we not using db.User and just User ...
        user: await Driver.findOneAndUpdate(
            {
                "personalDetails.mobileNumber": userNumber,
            },
            {
                $set: {
                    OTP: otp,
                },
            },
            {
                new: true,
                select: {
                    "personalDetails.mobileNumber": true,
                    "_id": false,
                },
            }),
    };
};

const updateRiderOTP = async (userNumber, otp) => {
    return {
        // why are we not using db.User and just User ...
        user: await Rider.findOneAndUpdate(
            {
                "personalDetails.mobileNumber": userNumber,
            },
            {
                $set: {
                    OTP: otp,
                },
            },
            {
                new: true,
                select: {
                    "personalDetails.mobileNumber": true,
                    "_id": false,
                },
            }),
    };
};

export const getAllDrivers = async () => {
    const users = await Driver.find();
    return users;
};

export const getAllRiders = async () => {
    const users = await Rider.find();
    return users;
};

export const registerDriverPhone = async ({ body: { mobileNumber: userNumber, userType: type } }) => {
    const oldUser = await Driver.findOne({ "personalDetails.mobileNumber": userNumber });
    if (oldUser && oldUser.mobileNumberVerified) {
        throw new Error(messages.USER_NUMBER_EXISTS);
    } else if (oldUser) {
        const { status, data, otp } = await sendOTP(userNumber);
        if (status === httpRequests.status.SUCCESS) {
            return updateDriverOTP(userNumber, otp);
        } else {
            throw new Error(data);
        }
    } else {
        const { status, data, otp } = await sendOTP(userNumber);
        if (status === httpRequests.status.SUCCESS) {
            return createBasicDriver(userNumber, otp, type);
        } else {
            throw new Error(data);
        }
    }
};

export const registerRiderPhone = async ({ body: { mobileNumber: userNumber, userType: type } }) => {
    const oldUser = await Rider.findOne({ "personalDetails.mobileNumber": userNumber });
    if (oldUser && oldUser.mobileNumberVerified) {
        throw new Error(messages.USER_NUMBER_EXISTS);
    } else if (oldUser) {
        const { status, data, otp } = await sendOTP(userNumber);
        if (status === httpRequests.status.SUCCESS) {
            return updateRiderOTP(userNumber, otp);
        } else {
            throw new Error(data);
        }
    } else {
        const { status, data, otp } = await sendOTP(userNumber);
        if (status === httpRequests.status.SUCCESS) {
            return createBasicRider(userNumber, otp, type);
        } else {
            throw new Error(data);
        }
    }
};

export const verifyDriver = async ({ body: { mobileNumber: userNumber, OTP } }) => {
    const user: IDriver = await Driver.findOne({ "personalDetails.mobileNumber": userNumber })
        .select({
            mobileNumberVerified: true,
            _id: false,
            OTP: true,
        });
    if (!user) {
        throw new Error("invalid user");
    }
    if (user.OTP === OTP) {
        const { mobileNumberVerified } = user;
        return { user: { mobileNumberVerified } }; //  todo:: no need to sennd this ,
    } else {
        throw new Error(messages.INVALID_OTP);
    }
};

export const verifyRider = async ({ body: { mobileNumber: userNumber, OTP } }) => {
    const user: IRider = await Rider.findOne({ "personalDetails.mobileNumber": userNumber })
        .select({
            mobileNumberVerified: true,
            _id: false,
            OTP: true,
        });
    if (!user) {
        throw new Error("invalid user");
    }
    if (user.OTP === OTP) {
        const { mobileNumberVerified } = user;
        return { user: { mobileNumberVerified } }; //  todo:: no need to sennd this ,
    } else {
        throw new Error(messages.INVALID_OTP);
    }
};

export const resendVerifyDriverCode = async ({ body: { mobileNumber: userNumber } }) => {
    const user: IDriver = await Driver.findOne({ "personalDetails.mobileNumber": userNumber });
    if (!user) {
        throw new Error(messages.USER_NOT_FOUND);
    } else {
        const { status, data, otp } = await sendOTP(userNumber);
        if (status === httpRequests.status.SUCCESS) {
            return updateDriverOTP(userNumber, otp);
        } else {
            // todo: create custom error objeccts
            throw new Error(data);
        }
    }
};

export const resendVerifyRiderCode = async ({ body: { mobileNumber: userNumber } }) => {
    const user: IRider = await Rider.findOne({ "personalDetails.mobileNumber": userNumber });
    if (!user) {
        throw new Error(messages.USER_NOT_FOUND);
    } else {
        const { status, data, otp } = await sendOTP(userNumber);
        if (status === httpRequests.status.SUCCESS) {
            return updateRiderOTP(userNumber, otp);
        } else {
            // todo: create custom error objeccts
            throw new Error(data);
        }
    }
};

export const setDriverPin = async (req) => {
    const { pin, mobileNumber, OTP } = req.body;
    const hashedPin = generateHash(pin);
    const user: any = await Driver.findOneAndUpdate(
        {
            "personalDetails.mobileNumber": mobileNumber,
            "OTP": OTP,
        },
        {
            $set:
            {
                "personalDetails.pin": hashedPin,
                "mobileNumberVerified": true,
            },
        },
        {
            new: true,
            select: {
                "personalDetails.mobileNumber": true,
                "mobileNumberVerified": true,
                "personalDetails.userType": true,
                "_id": true,
                "signUpStep": true,
            },
        });
    if (!user) {
        throw new Error("Invalid OTP or Mobile Number");
    }
    const token: any = createJWTToken({ id: user._id, userType: user.personalDetails.userType, mobileNumber });
    return { user, token };
};

export const setRiderPin = async (req) => {
    const { pin, mobileNumber, OTP } = req.body;
    const hashedPin = generateHash(pin);
    const user: any = await Rider.findOneAndUpdate(
        {
            "personalDetails.mobileNumber": mobileNumber,
            "OTP": OTP,
        },
        {
            $set:
            {
                "personalDetails.pin": hashedPin,
                "mobileNumberVerified": true,
            },
        },
        {
            new: true,
            select: {
                "personalDetails.mobileNumber": true,
                "mobileNumberVerified": true,
                "personalDetails.userType": true,
                "_id": true,
                "signUpStep": true,
            },
        });
    if (!user) {
        throw new Error("Invalid OTP or Mobile Number");
    }
    const token: any = createJWTToken({ id: user._id, userType: user.personalDetails.userType, mobileNumber });
    return { user, token };
};

export const loginDriver = async ({ body: { mobileNumber: userNumber, pin, userType } }) => {

    const user: IDriver = await Driver.findOne({ "personalDetails.mobileNumber": userNumber });
    if (!user) {
        throw new Error(messages.USER_NOT_EXISTS_SIGNUP);
    } else if (!pin) {
        throw new Error(messages.USER_NOT_REGISTERED);
    } else if (!bcrypt.compareSync(pin.toString(), user.personalDetails.pin)) {
        throw new Error("Incorrect phone number or PIN code");

    } else if (user.personalDetails.userType !== userType) {
        throw new Error("Incorrect phone number or PIN code");
    }
    return {
        user, token: createJWTToken(
            { id: user._id, userType: user.personalDetails.userType, mobileNumber: user.personalDetails.mobileNumber }),
    };
};

export const loginRider = async ({ body: { mobileNumber: userNumber, pin, userType } }) => {

    const user: IRider = await Rider.findOne(
        {
            "personalDetails.mobileNumber": userNumber,
        },
    );
    if (!user) {
        throw new Error(messages.USER_NOT_EXISTS_SIGNUP);
    } else if (!pin) {
        throw new Error(messages.USER_NOT_REGISTERED);
    } else if (!bcrypt.compareSync(pin.toString(), user.personalDetails.pin)) {
        throw new Error("Incorrect phone number or PIN code");

    } else if (user.personalDetails.userType !== userType) {
        throw new Error("Incorrect phone number or PIN code");
    }
    return {
        user, token: createJWTToken(
            { id: user._id, userType: user.personalDetails.userType, mobileNumber: user.personalDetails.mobileNumber }),
    };
};

export const forgotDriverPassword = async ({ body: { mobileNumber: userNumber, userType } }) => {
    const oldUser: IDriver = await Driver.findOne({ "personalDetails.mobileNumber": userNumber });
    if (!oldUser) {
        throw new Error(messages.USER_NOT_EXISTS_SIGNUP);
    } else if (oldUser.mobileNumberVerified && oldUser.personalDetails.userType === userType) {
        const { status, data, otp } = await sendOTP(userNumber);
        if (status === httpRequests.status.SUCCESS) {
            return updateDriverOTP(userNumber, otp);
        } else {
            throw new Error(data);
        }
    } else {
        throw new Error("User exists but not verified");
    }
};

export const forgotRiderPassword = async ({ body: { mobileNumber: userNumber, userType } }) => {
    const oldUser: IRider = await Rider.findOne({ "personalDetails.mobileNumber": userNumber });
    if (!oldUser) {
        throw new Error(messages.USER_NOT_EXISTS_SIGNUP);
    } else if (oldUser.mobileNumberVerified && oldUser.personalDetails.userType === userType) {
        const { status, data, otp } = await sendOTP(userNumber);
        if (status === httpRequests.status.SUCCESS) {
            return updateRiderOTP(userNumber, otp);
        } else {
            throw new Error(data);
        }
    } else {
        throw new Error("User exists but not verified");
    }
};
