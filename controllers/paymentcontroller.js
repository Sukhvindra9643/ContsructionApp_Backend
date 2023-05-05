const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// Register a User
exports.processPayment = catchAsyncErrors(async (req, res, next) => {

  try{
    const {name,amount} = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount*100),
        currency: 'INR',
        description: name,
        payment_method_types: ['card'],
        receipt_email: req.user.email,
        metadata: {
          company: "ConstructionApp",
        },
    });

    const clientSecret = paymentIntent.client_secret;
    res.json({message: "Payment Successful", clientSecret});

  }catch(err){
    console.log(err);
    res.status(500).json({success: false, message: "Internal Server Error"});
  }
});

exports.paymentVerify = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  console.log("user",user);
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  }
  catch (err) {
    return res.status(400).send({message:err.message});
  }

  if(event.type === 'payment_intent.created'){
    const paymentIntent = event.data.object;
    console.log('PaymentIntent was created!');
    console.log(paymentIntent);
    // Then define and call a method to handle the successful payment intent.
    // handlePaymentIntentSucceeded(paymentIntent);
  }
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    user.wallet = user.wallet + paymentIntent.amount/100;
    await user.save();
    console.log('PaymentIntent was successful!');
    console.log(paymentIntent);
    // Then define and call a method to handle the successful payment intent.
    // handlePaymentIntentSucceeded(paymentIntent);
  }
  res.json({received: true})
});