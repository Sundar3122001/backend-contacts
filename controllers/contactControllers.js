const asyncHandler= require("express-async-handler")
const Contact=require("../models/contactModels")
//const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route GET/api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc update contact
//@route POST/api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});
//@desc Get all contacts
//@route GET/api/contacts
//@access public
const getContact=asyncHandler(async(req,res)=>{
const contact=await Contact.findById(req.params.id);
if(!contact){
    res.status(404);
    throw new Error("Contact not found");
}

res.status(200).json(contact);
})
//@desc update Contact
//@route put/api/contact
//@access public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ error: "Contact not found" }); // Send JSON response for error
      return; // Return to terminate the function
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Corrected 'new' to 'true' to return the updated document
    );
    res.status(200).json(updatedContact);
  });
  
//@desc delete Contact
//@route DELETE/api/contacts
//@access public
const deleteContact=asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ error: "Contact not found" }); // Send JSON response for error
      return; // Return to terminate the function
    }
    await Contact.remove(contact);
    res.status(201).json(deleteContact);
})


module.exports={getContacts, createContact,getContact, updateContact, deleteContact};