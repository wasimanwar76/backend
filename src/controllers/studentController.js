const Subscription = require('../models/Subscription');

exports.enrollInShift = async (req, res) => {
  const { shiftId, subscription_type } = req.body;

  try {
    const newSubscription = new Subscription({
      user: req.user.id,
      shift: shiftId,
      subscription_type
    });

    await newSubscription.save();
    return res.status(200).json({
      success: true,
      message: "Enrolled Successfully",
      newSubscription
    });
  } catch (err) {
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
};

exports.getMySubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.id }).populate('shift');
    return res.status(200).json(subscriptions);
  } catch (err) {
    return res.status(500).json({
      success:false,
      message:err.message
    })
  }
};
