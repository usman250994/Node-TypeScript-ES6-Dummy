// const bycrypt = require('bcryptjs');
import * as bcrypt from "bcryptjs";

/**
 * Given a password string in clear text, this function
 * returns a salt and a hash for it for storage in db.
 */
// export const generateHash = function(password) {
//     var hash = bycrypt.hashSync(password);
//     return hash;
// }
export const generateHash = (password) => (bcrypt.hashSync(password));

export const comparePasswordAndHash = (password, hash) => (bcrypt.compareSync(password, hash));

/**
 * This function gets the current UTC time in UNIX timestamp.
 * this should be used in all the places that have date/time and conversion
 * functions should be used on endpoints to convert this to the desired form.
 */
export const getUtcTimestamp = (date = new Date()): number => {
  const str: string = (date.getTime() / 1000) + "";
  return parseInt(str);
};

/**
 * This function returns constant fields that plug into all the mongoose models
 * that need createdAd and UpdpatedAt fields.
 */
export const createdAtUpdatedAtFields = {
  createdAt: { type: Number, default: () => (module.exports.getUtcTimestamp()) },
  updatedAt: { type: Number, default: () => (module.exports.getUtcTimestamp()) },
};

// --random code ranging (1000 - 9999)
export const randomNumber = () => (Math.floor(Math.random() * 8999) + 1000);

// returns string with first letter capital
export const capitalize = (val) => {
  const firstLetter = val.charAt(0).toUpperCase();
  const remainingString = val.slice(1).toLowerCase();
  return firstLetter + remainingString;
};
