const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Service = require("../models/MyQueryService");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/UserModel");
const ErrorHandler = require("../utils/errorhandler");
// Create new category --> Admin/Seller
exports.CreateQueryService = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;


  const user = await User.findById(req.user.id);
  const buyer = await User.findById(req.body.userId)
  const service = await Service.create(req.body);


  res.status(201).json({
    success: true,
    service,
  });

  let message = `${user.name} Acceted your request\nContact Details\nName : ${user.name}\nMobile : ${user.mobile}\nEmail : ${user.email}\nAddress : ${user.address}\nService Name : ${service.serviceName}`;

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
exports.getAllQueryService = catchAsyncErrors(async (req, res, next) => {
  const services = await Service.find().sort({"createdAt":-1});
  res.status(200).json({
    success: true,
    services,
  });
});
exports.getMyQueryService = catchAsyncErrors(async (req, res, next) => {
  const myqueryservices = await Service.find({user:req.user.id}).sort({"createdAt":-1});
  
  res.status(200).json({
    success: true,
    myqueryservices,
  });
});



