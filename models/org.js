const mongoose = require("mongoose");
const uuidApiKey = require("uuid-apikey");
const mongooseBcrypt = require("mongoose-bcrypt");
const mongooseTimeStamp = require("mongoose-timestamp");
const validator = require("validator");
const { string } = require("@hapi/joi");

const orgSchema = new mongoose.Schema(
  { 
    orgLogo : {
      type: String,
      trim: true,
    },
    usertype: {
      type:String,
      default:"Admin",
      enum:["Admin"]
    },
    orgName: {
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 100,
      required: true,
    },
    website: {
      type: String,
      required: true,
      trim: true,
    },
    describe: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength:200,
    },
    address: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 150,
      trim: true,
    },
    adminName : {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
      trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true,
        validate: function (value) {
          return validator.isEmail(value);
        },
    },
    password: {
        type: String,
        required: true,
        bcrypt: true,
        minlength: 8,
        maxlength: 32
    },
    api_key: {
        type: String,
        required: true,
        unique: true,
        default: uuidApiKey.create().apiKey,
    },
  },
  { collection: "organizations"}
);

orgSchema.plugin(mongooseBcrypt);
orgSchema.plugin(mongooseTimeStamp);

module.exports = mongoose.model("Organizations", orgSchema);