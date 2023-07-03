const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ServiceQuery = require("../models/ServiceBookingModel");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/UserModel");


// Create new category --> Admin/Seller
exports.createServiceQuery = catchAsyncErrors(async (req, res, next) => {
  req.body.ratings = {totalratings:req.body.totalratings,noofusers:req.body.noofuser};
  delete req.body.totalratings;
  delete req.body.noofusers;

  const serviceQuery = await ServiceQuery.create({
    servicename: req.body.servicename,
    price: parseInt(req.body.price),
    hourlyPrice: parseInt(req.body.hourlyPrice),
    public_id: req.body.public_id,
    url: req.body.url,
    sellerId:req.body.sellerId,
    sellername: req.body.sellername,
    sellermobile: req.body.sellermobile,
    sellerratings: req.body.ratings,
    user: req.body.user,
  });

  const user = await User.findById(req.body.user);

  const message = ` service name : ${serviceQuery.servicename} \n user name : ${user.name}\n price : ₹ ${serviceQuery.price}`
      
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
  const serviceQueries = await ServiceQuery.find({user:req.user.id}).sort({"createdAt":-1})
  res.status(200).json({
    success: true,
    serviceQueries,
  });
})
exports.getSellerServiceQuery = catchAsyncErrors(async (req, res, next) => {
  const serviceQueries = await ServiceQuery.find({sellername:req.user.name}).populate("user").sort({"createdAt":-1});
  res.status(200).json({
    success: true,
    serviceQueries,
  });
});
