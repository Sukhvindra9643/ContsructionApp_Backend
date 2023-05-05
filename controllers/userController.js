const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  req.body.bname = req.body.bname ? req.body.bname : req.body.name;
  req.body.mobile = "XXXXXXXXXX";
  req.body.address = "";
 req.body.shopInfo = req.body.shopInfo.split(",")

  const user = await User.create(req.body);

  res.status(200).json({
    success: true,
    message: "Registered Successfully",
    user
  });
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  console
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout User
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(user)
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const message = `username: ${req.body.email} \nnewpassword:${req.body.email} \n\nIf you have not requested this email then, please ignore it.\nPlease change your password after login.`;

  try {
    const result = await sendEmail({
      email: user.email,
      subject: `Password Recovery`,
      message,
    });
  
    if (result) {
      user.password = req.body.email;
      await user.save({ validateBeforeSave: false });
      res.status(200).json({
        success: true,
        message: `New password has been sent to this email ${user.email}`,
      });
    }
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

//Get User Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});
// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }
  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  req.body.mobile = req.body.mobile != "" ? req.body.mobile : ""
  req.body.address = req.body.address != "" ? req.body.address : ""
  
  const u = await User.findById(req.user.id);

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name ? req.body.name : u.name,
      email: req.body.email ? req.body.email : u.email,
      mobile: req.body.mobile ? req.body.mobile : u.mobile,
      address: req.body.address ? req.body.address : u.address,
      avatar: {
        public_id: req.body.public_id ? req.body.public_id : u.avatar.public_id,
        url: req.body.url ? req.body.url : u.avatar.url,
      },
      wallet: u.wallet + parseInt(req.body.wallet),
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    user
  });
});

// Get all users detail --> Admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});
exports.getAllSellers = catchAsyncErrors(async (req, res, next) => {
  const {shopInfo} = req.query;
  const sellers = await User.find({'shopInfo':shopInfo})
  
  res.status(200).json({
    success: true,
    sellers,
  });
});


// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

exports.addServices = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  let add = user.shopInfo;

  for(let i=0;i<req.body.length;i++){
    if(user.shopInfo[i] !== req.body[i].value){
      add.push(req.body[i].value)
    }
  }

  user.shopInfo = add;
  await user.save();

  res.status(200).json({
    success: true,
    user
  });
});
