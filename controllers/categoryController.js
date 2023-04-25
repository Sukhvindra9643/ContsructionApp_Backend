const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");
const Category = require("../models/categoryModel");

// Create new category --> Admin/Seller
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  console.log("req.body", req.body);

  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    category,
  });
});

//Get service Details --> Admin/Seller
exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    categories,
  });
});

// Update service --> admin/seller
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    category,
  });
});

// Delete Service --Admin/Seller
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!service) {
    return next(
      new ErrorHandler(`Category does not exist with Id: ${req.params.id}`, 400)
    );
  }

  // const imageId = service.images.public_id;

  // await cloudinary.v2.uploader.destroy(imageId);

  await service.remove();

  res.status(200).json({
    success: true,
    message: "Category Deleted Successfully",
  });
});