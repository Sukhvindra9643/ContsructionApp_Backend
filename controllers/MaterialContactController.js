const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Contact = require("../models/myMaterialContactModel");

// Create new category --> Admin/Seller
exports.CreateContact = catchAsyncErrors(async (req, res, next) => {
  req.body.name = req.user.name;
  req.body.user = req.user.id;
  req.body.materials = req.body.materials.split(",");


  const contact = await Contact.create(req.body);

  res.status(201).json({
    success: true,
    contact,
  });
});

//Get service Details --> Admin/Seller
exports.getAllContact = catchAsyncErrors(async (req, res, next) => {
  const contacts = await Contact.find().sort({"createdAt":-1});
  res.status(200).json({
    success: true,
    contacts,
  });
});
exports.getMyContact = catchAsyncErrors(async (req, res, next) => {
  const mycontact = await Contact.find({user:req.user.id}).sort({"createdAt":-1});
  
  res.status(200).json({
    success: true,
    mycontact,
  });
});



