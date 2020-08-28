let Model = require("../models/index")

let isUniqe = async function (data) {
    let org = null;
    try {
      org = await Model.Organizations.aggregate(
          [
              {$match : {email:  data.email}}
          ]
      )
    } catch (err) {
      console.log(err);
    }
    return org;
};
let validUser = async function (email) {
    let org = null;
    try {
      org = await Model.Organizations.aggregate(
          [
              {$match : {email:  email}}
          ]
      )
    } catch (err) {
      console.log(err);
    }
    return org;
};
  
let addOrg = async function (data) {
    let org = null;
    try {
      org = await new Model.Organizations(data).save();
    } catch (err) {
      console.log(err);
    }
    return org;
};

// let deleteUser = async function (user) {
//   let success = true;
//   try {
//     await Model.deleteOne({ _id: user._id });
//   } catch (err) {
//     success = false;
//   }
//   return success;
// };

module.exports = {
    Isuniqe : isUniqe,
    AddOrg : addOrg,
    ValidUser : validUser
    // DeleteUser: deleteUser,
};
