const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const Service = require("../models/serviceModel");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary");

// Register a User --> Admin/Seller
exports.createService = catchAsyncErrors(async (req, res, next) => {
  let public_id = [];
  let url = [];

  if (req.body.public_id[0] === "" && req.body.url[0] === "") {
    public_id = ""
    url = ""
  }
  
  const image = {
    public_id : req.body.public_id.split(","),
    url : req.body.url.split(",")
  }

  const imagesLinks = [];
  imagesLinks.push(image);

  req.body.images = imagesLinks;
  req.body.user = req.user.id;
  req.body.bname = req.user.bname ? req.user.bname : req.user.role;
  req.body.address = req.user.address ? req.user.address : "";
  delete req.body.public_id;
  delete req.body.url;


  const service = await Service.create(req.body);

  res.status(201).json({
    success: true,
    service,
  });
});



//Get service Details --> Admin/Seller
exports.getServiceDetails = catchAsyncErrors(async (req, res, next) => {
  const service = await Service.findById(req.params.id);
 
  res.status(200).json({
    success: true,
    service,
  });
});

// Update service --> admin/seller
exports.updateService = catchAsyncErrors(async (req, res, next) => {
  const service = await Service.findByIdAndUpdate(
    req.params.id,req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    service,
  });
});

// Get all services detail --> Admin
exports.getAllServices = catchAsyncErrors(async (req, res, next) => {
  const services = await Service.find();

  res.status(200).json({
    success: true,
    services,
  });
});

// Get all services detail --> Seller
exports.getAllSellerServices = catchAsyncErrors(async (req, res, next) => {
  const services = await Service.find({user:req.user.id});

  res.status(200).json({
    success: true,
    services,
  });
});
exports.getAllAdminServices = catchAsyncErrors(async (req, res, next) => {
  const services = await Service.find();
  res.status(200).json({
    success: true,
    services,
  });
});


// Delete Service --Admin/Seller
exports.deleteService = catchAsyncErrors(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(
      new ErrorHandler(`Service does not exist with Id: ${req.params.id}`, 400)
    );
  }

  // const imageId = service.images.public_id;

  // await cloudinary.v2.uploader.destroy(imageId);

  await service.remove();

  res.status(200).json({
    success: true,
    message: "Service Deleted Successfully",
  });
});
