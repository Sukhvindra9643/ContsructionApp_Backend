const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Contact = require("../models/MyMaterialContactModel");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/UserModel");
const ErrorHandler = require("../utils/errorhandler");
// Create new category --> Admin/Seller
exports.CreateContact = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  req.body.materials = req.body.materials.split(",");

  const user = await User.findById(req.user.id);
  const buyer = await User.findById(req.body.userId)
  const contact = await Contact.create(req.body);

  res.status(201).json({
    success: true,
    contact,
  });
  let message = `${user.name} Acceted your request\nContact Details\nName : ${user.name}\nMobile : ${user.mobile}\nEmail : ${user.email}\nAddress : ${user.address}\nMaterials : ${contact.materials}`;

  try {
    const result = await sendEmail({
      email: buyer.email,
      subject: "Request Accepted",
      message,
      type: "text",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
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



