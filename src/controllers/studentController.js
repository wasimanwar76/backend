const Subscription = require('../models/Subscription');
const Shift = require("../models/Shift")
exports.enrollInShift = async (req, res) => {
  const { shiftId, subscription_type } = req.body;

  try {

    const shift = await Shift.findById(shiftId);

    if (!shift) {
      return res.status(404).json({ success: false, message: 'Shift not found' });
    }


    // Calculate the total price
    const durationMap = {
      'Monthly': 1,
      '3 Months': 3,
      '6 Months': 6,
      '12 Months': 12
    };

    // if user choosed 3 month plan ,it will calc price 
    const duration = durationMap[subscription_type];
    const price = shift.discounted_price?shift.discounted_price:shift.shift_price
    const totalPrice = price * duration;



    // payment config 
    // if(!status){
    //   return res.json("payment failed")
    // }
    const newSubscription = new Subscription({
      user: req.user.id,
      shift: shiftId,
      subscription_type,
      payment_status: 'Pending',
      subscription_status: 'Pending',
      price: totalPrice
    });

    await newSubscription.save();
    
    return res.status(200).json({
      success: true,
      message: "Enrolled Successfully",
      newSubscription
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
};

exports.getMySubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.id }).populate('shift');
    return res.status(200).json(subscriptions);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
};
