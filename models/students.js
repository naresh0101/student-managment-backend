const mongoose = require("mongoose");
const mongooseBcrypt = require("mongoose-bcrypt");
const mongooseTimeStamp = require("mongoose-timestamp");
const uuidApiKey = require("uuid-apikey");

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
    },
    phone: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
      minlength: 13,
      maxlength
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
      required: true,
      enum: [STATUS_ACTIVE, STATUS_PENDING, STATUS_DISABLED, STATUS_DELETED],
      default: STATUS_PENDING,
    },
  },
  { collection: "students" }
);

studentSchema.plugin(mongooseBcrypt);
studentSchema.plugin(mongooseTimeStamp);

module.exports = mongoose.model("Students", studentSchema);
