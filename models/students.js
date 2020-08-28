const mongoose = require("mongoose");
const mongooseBcrypt = require("mongoose-bcrypt");
const mongooseTimeStamp = require("mongoose-timestamp");
const uuidApiKey = require("uuid-apikey");
const { string } = require("@hapi/joi");

const STATUS_ACTIVE = "active",
  STATUS_PENDING = "pending",
  STATUS_DELETED = "deleted",
  STATUS_DISABLED = "disabled";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 100,
      required: true,
    },
    usertype:{
      type:String,
      default: "Student",
      enum: ["Student"]
    },
    orgArray : [
            {
                type : Object,
                orgId : mongoose.SchemaType.ObjectId,
                roles : { 
                    type:Number,
                    enum : [1,2],
                    default : 1,
                },
                active : {
                    type : Boolean,
                    default : true
                }
            }
    ],
    profile: {
      type: String,
      trim: true,
      minlength:3,
      maxlength:100
    },
    phone: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
      minlength: 10,
      maxlength:16
    },
    describe: {
      type: String,
      trim: true,
      minlength: 5,
      required:true,
      maxlength: 100,
    },
    password: {
      type: String,
      required: true,
      bcrypt: true,
    },
    api_key: {
      type: String,
      required: true,
      unique: true,
      default: uuidApiKey.create().apiKey,
    },
    status: {
      type: String,
      enum: [STATUS_ACTIVE, STATUS_PENDING, STATUS_DISABLED, STATUS_DELETED],
      default: STATUS_ACTIVE,
    },
  },
  { collection: "students" }
);

studentSchema.plugin(mongooseBcrypt);
studentSchema.plugin(mongooseTimeStamp);

module.exports = mongoose.model("Students", studentSchema);