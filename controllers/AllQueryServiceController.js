const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Query = require("../models/AllQueryServiceModal");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/UserModel");

// Create new category --> Admin/Seller
exports.CreateQueryService = catchAsyncErrors(async (req, res, next) => {
  req.body.name = req.user.name;
  req.body.user = req.user.id;
  req.body.budget = parseInt(req.body.budget);
  req.body.createdAt = new Date();
  req.body.expireAt = new Date().getTime() + 1000 * 60 * 60 * 24 * 30;

  let createdat =
    new Date().toLocaleString().split(",")[0] +
    "" +
    new Date().toLocaleString().split(",")[1];
  let query;
  let message;

  try {
    query = await Query.create(req.body);
  } catch (error) {
    console.log(error);
  }
  const users = await User.find({ role: ["admin", "seller"] });
  const emails = users.map((user) => user.email);
  let locality = query.locality.split(",").splice(2);
  try {
    const contact = req.body.mobile.substring(0, 5) + "XXXXX";
    message = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
    </head>
    <body style="display: flex; align-items:center; justify-content:center;width:100vw;height:auto">
      <main style="display: flex; align-items:center; justify-content:center; backgroud-color:green">
        <div style="background-color: white;padding: 20px;box-shadow: 2px 2px 2px 2px gray;">
          <p style="margin:0px;font-size:20px">Buyer Name : ${query.name}</p>
          <p style="margin:0px;font-size:20px">Service Name : ${query.serviceName}</p>
          <p style="margin:0px;font-size:20px">Budget : ₹ ${query.budget}</p>
          <p style="margin:0px;font-size:20px">Contact no. : ${contact}</p>
          <p style="margin:0px;font-size:20px">Locality : ${locality}</p>
          <p style="margin:0px;font-size:20px">CreatedAt : ${createdat}</p>
          <hr>
        </div>
      </main>
    </body>
  </html>`;
  } catch (error) {
    console.log(error);
  }

  res.status(201).json({
    success: true,
    query,
  });
  for (let i = 0; i < emails.length; i++) {
    try {
      const result = await sendEmail({
        email: emails[i],
        subject: `New Construction Query Created Check Now`,
        message,
        type: "html",
      });
    } catch (error) {
      query.remove();
    }
  }
});

//Get service Details --> Admin/Seller
exports.getAllQueryServices = catchAsyncErrors(async (req, res, next) => {
  const queries = await Query.find().sort({ createdAt: -1 });

  queries.filter((query) => {
    if (query.expireAt < new Date().getTime()) {
      query.remove();
    }
  });

  res.status(200).json({
    success: true,
    queries,
  });
});
exports.getMyQueryServices = catchAsyncErrors(async (req, res, next) => {
  const myqueries = await Query.find({ user: req.user.id }).sort({
    createdAt: -1,
  });
  res.status(200).json({
    success: true,
    myqueries,
  });
});

// Update service --> admin/seller
exports.updateMyQueryService = catchAsyncErrors(async (req, res, next) => {
  req.body.materials = req.body.materials.split(",");
  const query = await Query.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    query,
  });
});

// Delete Service --Admin/Seller
exports.deleteMyQueryService = catchAsyncErrors(async (req, res, next) => {
  const query = await Query.findById(req.params.id);

  if (!query) {
    return next(
      new ErrorHandler(`Query does not exist with Id: ${req.params.id}`, 400)
    );
  }

  await query.remove();

  res.status(200).json({
    success: true,
  });
});
