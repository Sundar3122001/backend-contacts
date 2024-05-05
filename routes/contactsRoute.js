const express = require("express");
const router = express.Router();
const contactsController= require("../controllers/contactControllers")
const validateToken=require("../middleware/validateTokenHandler")
router.use(validateToken)
router.route("/").get(contactsController.getContacts).post(contactsController.createContact)
router.route("/:id").get(contactsController.getContact).put(contactsController.updateContact).delete(contactsController.deleteContact)

module.exports=router;