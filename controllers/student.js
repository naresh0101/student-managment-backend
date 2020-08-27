const Models = require("../models"),
  studentsService = require('../services/students'),
  Joi = require("@hapi/joi");
const students = require("../models/students");

class StudentController {
    async loginAccount(req, res) {
        let reqBody = req.body,
          resBody = { success: false };
        let inputSchema = Joi.object({
          phone: Joi.string().min(13).max(13).required(),
          password: Joi.string().min(8).max(32).required(),
        });
        try {
          await inputSchema.validateAsync(reqBody);
        } catch (err) {
          resBody.message = err.message.replace(/\"/g, "");
          return res.status(200).json(resBody);
        }
        let student = await Models.Students.findOne({phone : reqBody.phone})
        if (!student) {
          resBody.message = "Invalid number provided";
          return res.status(200).json(resBody);
        }
        const isValidPassword = await student.verifyPassword(reqBody.password);
        if (!isValidPassword) {
          resBody.message = "Invalid password provided";
          return res.status(200).json(resBody);
        }
        resBody = {
          success : true,
          student: student.toJSON(),
          token: student.api_key,
          message : "Login successfully"
        };
        res.status(200).json(resBody);
    }

}

module.exports = new StudentController()