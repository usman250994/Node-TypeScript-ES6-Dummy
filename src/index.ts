import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../.env") });
import * as Express from "express";
import * as  expressValidator from "express-validator";
import * as cors from "cors";
import * as morgan from "morgan";
import * as database from "./database/index";
import { json } from "body-parser";

const app = Express();
app.use(morgan("combined"));
app.use(json({ limit: "10mb", inflate: true }));
app.use(cors());
app.use(expressValidator());
database.connectDB();

const whiteList = [
    "/auth/driver/",

    "/auth/driver/registerPhone",

    "/auth/driver/verifyUser",

    "/auth/driver/resendCode",

    "/auth/driver/setPin",

    "/auth/driver/loginUser",

    "/auth/rider/",

    "/auth/rider/registerPhone",

    "/auth/rider/verifyUser",

    "/auth/rider/resendCode",

    "/auth/rider/setPin",

    "/auth/rider/loginUser",

    "/auth/driver/forgotPassword",

    "/auth/rider/forgotPassword",

    "/driver/searchDrivers",

    "/driver/driversTimeline",

    "/searchDriver/getCities",

    "/searchDriver/getStartTiming",

    "/searchDriver/getEndTiming",

    "/pricing/",

];

const authMiddlewareConst = require("./shared/authMiddleware");
app.use(authMiddlewareConst.getAuthMiddleware(whiteList));

const driver = require("./modules/driver/route");
app.use("/driver", driver);

const rider = require("./modules/rider/route");
app.use("/rider", rider);

const auth = require("./modules/auth/route");
app.use("/auth", auth);

const pricing = require("./modules/pricing/route");
app.use("/pricing", pricing);

const searchDriver = require("./modules/searchDriver/route");
app.use("/searchDriver", searchDriver);

app.listen(
    // use port 300 if not defined in environment
    // for production port s defined, else 3000 for local development
    process.env.PORT ? process.env.PORT : 3000, () => {
        console.log("Listening on requested port");
    });

process
    .on("unhandledRejection", (reason, p) => {
        console.error(reason, "Unhandled Rejection at Promise", p);
    })
    .on("uncaughtException", (err) => {
        console.error(err, "Uncaught Exception thrown");
        process.exit(1);
    });
