const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Query = require("../models/materialQueryModel");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/userModel");

// Create new category --> Admin/Seller
exports.CreateQuery = catchAsyncErrors(async (req, res, next) => {
  req.body.name = req.user.name;
  req.body.user = req.user.id;
  req.body.materials = req.body.materials.split(",");
  const query = await Query.create(req.body);

  const users = await User.find({ role: ["admin", "seller"] });
  const emails = users.map((user) => user.email);

  const contact = req.body.mobile.substring(0, 5) + "XXXXX";

  const message = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
    </head>
    <body style="display: flex; align-items:center; justify-content:center;width:100vw;height:auto">
      <main style="display: flex; align-items:center; justify-content:center; backgroud-color:green">
        <div style="background-color: white;padding: 20px;box-shadow: 2px 2px 2px 2px gray;">
          <p style="margin:0px;font-size:20px">${query.name}</p>
          <p style="margin:0px;font-size:20px">Budget : ₹ ${query.budget}</p>
          <p style="margin:0px;font-size:20px">Area : ${query.area}/sqft</p>
          <p style="margin:0px;font-size:20px">Contact no. : ${contact}</p>
          <p style="margin:0px;font-size:20px">CreatedAt : ${query.createdAt}</p>
          <p style="margin:0px;font-size:20px">No. of materials : ${query.materials.length}</p>
          <hr>
        </div>
      </main>
    </body>
  </html>`;

  try {
    const result = await sendEmail({
      email: emails,
      subject: `New Construction Query Created Check Now`,
      message,
      type: "html",
    });
  } catch (error) {
    query.remove();
    return next(new ErrorHandler(error.message, 500));
  }
  res.status(201).json({
    success: true,
    query,
  });
});

//Get service Details --> Admin/Seller
exports.getAllQueries = catchAsyncErrors(async (req, res, next) => {
  const queries = await Query.find().sort({"createdAt":-1});
  console.log("allqueries", queries)
  res.status(200).json({
    success: true,
    queries,
  });
});
exports.getMyQueries = catchAsyncErrors(async (req, res, next) => {
  const myqueries = await Query.find({ user: req.user.id }).sort({"createdAt":-1});

  res.status(200).json({
    success: true,
    myqueries,
  });
});

// Update service --> admin/seller
exports.updateMyQuery = catchAsyncErrors(async (req, res, next) => {
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
exports.deleteMyQuery = catchAsyncErrors(async (req, res, next) => {
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
