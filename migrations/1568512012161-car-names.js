'use strict'

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


const CarSchema = new mongoose.Schema({
  carName: { type: String },
  carCategory: { type: String, enum: ["Mini","Go","Go+"] },
});




module.exports.up = async function () {
  try {
    console.log("we are conncted");
    await connectDB();
    const a = mongoose.model("Car", CarSchema);
    a.insertMany([
      { carName: "Suzuki Mehran" , carCategory: "Mini"},
      { carName: "Suzuki Alto old" , carCategory: "Mini"},
      { carName: "Hyundai Santro" , carCategory: "Mini"},
      { carName: "Daihatsu Coure" , carCategory: "Mini"},
      { carName: "Suzuki Cultus old" , carCategory: "Go"},
      { carName: "Suzuki Cultus new" , carCategory: "Go"},
      { carName: "Suzuki Alto new" , carCategory: "Go"},
      { carName: "Suzuki Swift" , carCategory: "Go"}
    ]);
  }
  catch (e) {
    console.log(e)
  }
}

module.exports.down = async function () {
  try {
    console.log("we are conncted");
    await connectDB();
    const a = mongoose.model("Car", CarSchema);
    a.remove({});
  }
  catch (e) {
    console.log(e)
  }
}
