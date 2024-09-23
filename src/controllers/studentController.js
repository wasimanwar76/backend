const Subscription = require("../models/Subscription");
const Shift = require("../models/Shift");

const { createOrder } = require("../utils/payment/createOrderUpi");

exports.enrollInShift = async (req, res) => {
  const { shiftId, subscription_type } = req.body;

  if (!shiftId || !subscription_type) {
    return res.status(400).json({
      success: false,
      message: "Shift ID and subscription type are required",
    });
  }

  try {
    const shift = await Shift.findById(shiftId);

    if (!shift) {
      return res.status(404).json({
        success: false,
        message: "Shift not found",
      });
    }

    // Calculate the total price based on the subscription type
    const durationMap = {
      Monthly: 1,
      "3 Months": 3,
      "6 Months": 6,
      "12 Months": 12,
    };

    const duration = durationMap[subscription_type];
    const price = shift.discounted_price || shift.shift_price;

    // Validate that price is a valid number
    if (isNaN(price) || price < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid price for shift",
      });
    }

    const amount = price * duration;

    // Step 1: Create order with Upigateway
    try {
      const order = await createOrder(shiftId, req.user.id, amount);
      if (order) {
        return res.status(200).json(order);
      }
      // Set your Upigateway API credentials and endpoint
      const apiKey = process.env.UPIGATEWAY_API_KEY;
      console.log(apiKey);

      const verifyPaymentEndpoint = process.env.UPIGATEWAY_VERIFYORDER;
      console.log(verifyPaymentEndpoint);

      const todayDate = new Date().toLocaleDateString("en-GB"); // Format as "DD-MM-YYYY"

      // Prepare the verification data
      const verifyData = {
        key: apiKey,
        client_txn_id: clientId,
        txn_date: todayDate,
      };

      // Send the POST request to verify payment status
      const response = await axios.post(`${verifyPaymentEndpoint}`, verifyData);
      console.log("Verify Payment Response Data", response.data);

      // // Handle the payment verification response accordingly
      // if (response.data.success) {
      //   // Process successful payment here
      //   return res
      //     .status(200)
      //     .json({ success: true, message: "Payment verified", order });
      // } else {
      //   // Handle payment failure here
      //   return res
      //     .status(400)
      //     .json({ success: false, message: "Payment verification failed" });
      // }
    } catch (error) {
      console.error(
        "Error creating order or verifying payment:",
        error.message
      );
      return res.status(500).json({
        success: false,
        message: "Failed to create order or verify payment",
        details: error.message,
      });
    }
  } catch (err) {
    console.error("Error during enrollment:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      details: err.message,
    });
  }
};

exports.getMySubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      user: req.user.id,
    }).populate("shift");
    return res.status(200).json(subscriptions);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getShiftById = async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id);

    if (!shift) {
      return res.status(400).json({
        success: false,
        message: "No Shift found",
      });
    }

    return res.status(200).json({ success: true, shift });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
