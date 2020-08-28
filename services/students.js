let Model = require("../models/index")

let validUser = async function (phone) {
    let org = null;
    try {
      org = await Model.Students.aggregate(
          [
              {$match : {phone:  phone}}
          ]
      )
    } catch (err) {
      console.log(err);
    }
    return org;
};
  
let addStudent = async function (data) {
    let org = null;
    try {
      org = await new Model.Students(data).save();
    } catch (err) {
      console.log(err);
    }
    return org;
};

module.exports = {
    ValidUser : validUser,
    AddStudent : addStudent
    // DeleteUser: deleteUser,
};
