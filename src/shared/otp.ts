import axios from "axios";

export const sendOTP = ({ mobileNumber, OTP }) => {
    let apiCall: string = "http://smsctp3.eocean.us:24555/api?";
    apiCall += "action=" + process.env.OTP_ACTION + "&username=" + process.env.OTP_USERNAME;
    apiCall += "password=" + process.env.OTP_PASSWORD + "recipient=" + mobileNumber;
    apiCall += "originator=" + process.env.OTPORIGINATOR + "messagedata=" + OTP;
    axios.get(apiCall)
        .then((response) => {
            console.log(response.data.status);
            return response.data.status;
        })
        .catch((error) => {
            console.log(error);
        });
};
