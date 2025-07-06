const mongoose = require('mongoose');
const PaymentCollection = require("../../../models/payment");
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const RentRequestCollection = require("../../../models/rentRequest");
const PropertyCollection = require("../../../models/property");

//Creating Payment Intent
const paymentIntentController = async (req, res) => {

    try {
      const paymentAmount = req.body

      const convertedAmount = parseInt(paymentAmount.totalamount) / 100;

      const paymentIntent = await stripe.paymentIntents.create({
          currency: 'usd',
          amount: convertedAmount,
          payment_method_types: ['card']
          });

      res.status(201).json({clientSecret: paymentIntent.client_secret });

    } catch (error) {
      res.status(500).json({ message: "Rent request Failed" , error});
    }
};


//Addint Payment data and updating property
const paymentController = async (req, res) => {

    try {
      const {_id, ...rest} = req.body

      const payment = await PaymentCollection.create(rest)
      const deleteRentReq = await RentRequestCollection.findByIdAndDelete(_id);
      const updatePropertyStatus = await PropertyCollection.findByIdAndUpdate(
        rest?.property,
        { status: "booked" },
        { new: true }
      );

      res.status(201).json({msg: 'payment success'});

    } catch (error) {
      res.status(500).json({ message: "payment request Failed" , error});
    }
};

module.exports = {
 paymentIntentController,
 paymentController
};
  