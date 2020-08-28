const Models = require("../models"),
  OrgService = require('../services/org'),
  studentsService = require('../services/students'),
  Joi = require("@hapi/joi");

class OrganizationController {
  
    async addOrg(req, res) {
        let reqBody = req.body,
        resBody = { success: false };  
        // Input body validation
        let inputSchema = Joi.object({
            orgLogo: Joi.string().min(3).max(100),
            describe: Joi.string().min(3).max(200),
            email: Joi.string().email().required(),
            orgName: Joi.string().min(5).max(100).required(),
            website: Joi.string().min(5).max(100).required(),
            address: Joi.string().min(3).max(150).required(),
            adminName: Joi.string().min(3).max(100).required(),
            password: Joi.string().min(8).max(32).required(),
          });
        try {
            await inputSchema.validateAsync(reqBody);
        } catch (err) {
            resBody.message = err.message.replace(/\"/g, "");
            return res.status(200).json(resBody);
        }
        let org = await OrgService.Isuniqe(reqBody)
        if (org.length != 0) {
            resBody.message = "Orgnization with this email address already exist!";
            return res.status(200).json(resBody);
        }
        org = await OrgService.AddOrg(reqBody);
        resBody.success = true;
        resBody.message = "Orgnization added Successfully";
        res.status(200).json(resBody);
    }

    async loginAccount(req, res) {
        let reqBody = req.body,
          resBody = { success: false };
        let inputSchema = Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().min(8).max(32).required(),
        });
        try {
          await inputSchema.validateAsync(reqBody);
        } catch (err) {
          resBody.message = err.message.replace(/\"/g, "");
          return res.status(200).json(resBody);
        }
        let org = await Models.Organizations.findOne({ email: reqBody.email });
        if (!org) {
          resBody.message = "Invalid email provided";
          return res.status(200).json(resBody);
        }
        const isValidPassword = await org.verifyPassword(reqBody.password);
        console.log(isValidPassword);
        if (!isValidPassword) {
          resBody.message = "Invalid password provided";
          return res.status(200).json(resBody);
        }
        resBody = {
          success : true,
          org: org.toJSON(),
          token: org.api_key,
          message : "Login successfully"
        };
        res.status(200).json(resBody);
    }

    async addstudents(req, res) {
      let reqBody = req.body,
      resBody = { success: false };
      // Input body validation
      let inputSchema = Joi.object({
          profile: Joi.string().min(3).max(100),
          name: Joi.string().min(3).max(100).required(),
          describe: Joi.string().min(3).max(100).required(),
          orgArray: Joi.object(
            {
              orgId: Joi.string().required(),
              roles : Joi.number().required(),
              active : Joi.boolean().required()
            }
          ).required(),
          phone: Joi.string().min(10).max(16).required(),
          password: Joi.string().min(8).max(32).required(),
        });
      try {
          await inputSchema.validateAsync(reqBody);
      } catch (err) {
          resBody.message = err.message.replace(/\"/g, "");
          return res.status(200).json(resBody);
      }
      try {
        const orgid = res.user[0]._id._id.toString()
        const isPartOfOrg = await Models.Students.aggregate(
          [
            {$match : {"orgArray.orgId" : orgid, "phone": reqBody.phone}},
            {$group : {_id : {phone : "$phone" } }},
          ])
          console.log(isPartOfOrg);
          if(isPartOfOrg.length !=0 ){
            if(isPartOfOrg[0]._id.phone === reqBody.phone){
              resBody.message = "Student with this number already exist!";
              return res.status(200).json(resBody);
            }
          }
          let student = await studentsService.ValidUser(reqBody.phone)
          if (student[0]) {
              return res.status(200).json(resBody);
          }
          await studentsService.AddStudent(reqBody);
          resBody.success = true;
          resBody.message = "Student added Successfully";
          res.status(200).json(resBody);
      } catch (err) {
        console.log(err);
          resBody.message = err.message.replace(/\"/g, "");
          return res.status(200).json(resBody);
      }
    }

    async fetchstudent(req, res, next) {
      let resBody = { success: false },
      reqBody = req.body  
      switch (res.user[0]._id.usertype) {
        case 'Admin':
            try {
              const students = await Models.Students.aggregate(
                [
                  {$match : { "orgArray.roles" : 2 }},
                  {$group : {_id : {phone : "$phone", name : "$name", profile : "$profile", status:"$status",describe: "$describe" } }},
                ]
              )
              resBody.success = true;
              resBody.data = students;
              res.status(200).json(students);
            } catch (err) {
              resBody.message = err.message.replace(/\"/g, "");
              return res.status(200).json(resBody);
            }
          break;
        default:
          resBody.success = false;
          resBody.message = "Students not found";
          res.status(200).json(resBody);
      }
    }
}

module.exports = new OrganizationController()