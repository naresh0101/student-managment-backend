const Models = require("../models"),
  OrgService = require('../services/org'),
  Joi = require("@hapi/joi");

class OrganizationController {
  
    async addOrg(req, res) {
        let reqBody = req.body,
        resBody = { success: false };   
        // Input body validation
        let inputSchema = Joi.object({
            orgLogo: Joi.string().min(3).max(100),
            describe: Joi.string().min(3).max(100),
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
        if (org) {
            resBody.message = "Orgnization with this email address already exist!";
            return res.status(200).json(resBody);
        }
        org = await OrgService.AddOrg(reqBody);
        resBody.success = true;
        resBody.message = "Orgnization added Successfully";
        res.status(200).json(resBody);

    }

}

module.exports = new OrganizationController()