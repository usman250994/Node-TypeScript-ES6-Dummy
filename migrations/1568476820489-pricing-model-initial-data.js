'use strict'

//definin mongoose opening connection and defining schema, because this is js file and cannot read from ts files,
// need to find an alternative (better solution)
const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(
      // DATABASE URI STRING HERE
    , { useNewUrlParser: true, useFindAndModify: false });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  return db.once("open", () => {
    console.log("we are conncted");
    return mongoose;
  });
};


const PricingSchema = new mongoose.Schema({
  direction: { type: String },
  carCategory: { type: String },
  startingRate: { type: Number },
  ACPerKM: { type: Number },
  movingPerKM: { type: Number },
  above20KM: { type: Number },
});



module.exports.up = async function () {
  try {
    console.log("we are conncted");
    await connectDB();
    const a = mongoose.model("Pricing", PricingSchema);
    a.insertMany([
      { direction: "bothWay", carCategory: "Go", startingRate: 40, ACPerKM: 5, movingPerKM: 6, above20KM: 60 },
      { direction: "oneWay", carCategory: "Go", startingRate: 20, ACPerKM: 10, movingPerKM: 12, above20KM: 60 },
      { direction: "bothWay", carCategory: "Go+", startingRate: 50, ACPerKM: 5, movingPerKM: 6, above20KM: 60 },
      { direction: "oneWay", carCategory: "Go+", startingRate: 25, ACPerKM: 10, movingPerKM: 12, above20KM: 60 },
      { direction: "bothWay", carCategory: "Mini", startingRate: 30, ACPerKM: 5, movingPerKM: 8, above20KM: 60 },
      { direction: "oneWay", carCategory: "Mini", startingRate: 10, ACPerKM: 3, movingPerKM: 6, above20KM: 60 }]);
  }
  catch (e) {
    console.log(e)
  }
}

module.exports.down = function (next) {
  next()
}