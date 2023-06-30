const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Service = require("../models/myQueryService");

// Create new category --> Admin/Seller
exports.CreateQueryService = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const service = await Service.create(req.body);
  res.status(201).json({
    success: true,
    service,
  });
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



