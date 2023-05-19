const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ServiceQuery = require("../models/serviceQueryModel");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/userModel");
// Create new category --> Admin/Seller
exports.createServiceQuery = catchAsyncErrors(async (req, res, next) => {
  const serviceQuery = await ServiceQuery.create({
    servicename: req.body.servicename,
    price: parseInt(req.body.price),
    public_id: req.body.public_id,
    url: req.body.url,
    sellername: req.body.sellername,
    sellermobile: req.body.sellermobile,
    user: req.body.user,
  });

  const user = await User.findById(req.body.user);
  console.log(serviceQuery,user);
  const message = ` service name : ${serviceQuery.servicename} \n user name : ${user.name}\n price : ₹ ${serviceQuery.price}`
      
  console.log(message);
  try {
    const result = await sendEmail({
      email: user.email,
      subject: `New Service Booked Check Now`,
      message,
      type:"text"
    });
  } catch (error) {
    serviceQuery.remove();
    return next(new ErrorHandler(error.message, 500));
  }

  res.status(201).json({
    success: true,
    serviceQuery,
  });
});

//Get service Details --> Admin/Seller
exports.getMyServiceQuery = catchAsyncErrors(async (req, res, next) => {
  const serviceQueries = await ServiceQuery.find({user:req.user.id})
  res.status(200).json({
    success: true,
    serviceQueries,
  });
})
exports.getSellerServiceQuery = catchAsyncErrors(async (req, res, next) => {
  const serviceQueries = await ServiceQuery.find({sellername:req.user.name}).populate("user");
  res.status(200).json({
    success: true,
    serviceQueries,
  });
});
