const Shift = require("../../models/Shift");
const User = require("../../models/User");
const axios = require("axios");
require("dotenv").config();
// Arrow function to create an order using Upigateway
const createOrder = async (shiftId, userId, amount) => {
  try {
    // Fetch the shift and user details
    const shift = await Shift.findById(shiftId);
    const user = await User.findById(userId);

    if (!shift || !user) {
      throw new Error("Shift or User not found.");
    }

    // Set your Upigateway API credentials and endpoint from environment variables
    const apiKey = process.env.UPIGATEWAY_API_KEY;
    const createOrderEndpoint = process.env.UPIGATEWAY_ENDPOINT;
    // Check if API key and endpoint are properly set
    if (!apiKey || !createOrderEndpoint) {
      throw new Error("Missing UPI Gateway API key or endpoint.");
    }

    // Generate Client Transaction ID
    const clientTxnId = () => {
      let transactionId = "";
      for (let i = 0; i < 15; i++) {
        transactionId += Math.floor(Math.random() * 10); // Generate random digits
      }
      return transactionId;
    };

    // Prepare the order data for the API request
    const orderData = {
      key: apiKey,
      client_txn_id: clientTxnId(), // Generate a unique transaction ID
      amount: String(amount), // Amount for the order (in smallest unit, e.g. paise for INR)
      p_info: shift.shift_name, // Product/Shift info
      customer_name: user.name, // User's name
      customer_email: user.email, // User's email
      customer_mobile: user.phone, // User's mobile
      redirect_url: process.env.PAYMENTREDIRECTURL, // Payment redirect URL
    };

    // Send the POST request to Upigateway's API to create the order
    const response = await axios.post(`${createOrderEndpoint}`, orderData);

    // Return the response data
    return response.data;
  } catch (error) {
    // Log the full error response for debugging
    console.error(
      "Error creating order:",
      error.response?.status, // Log HTTP status code
      error.response?.data || error.message, // Log response data or message
      error.response?.headers // Log headers for tracing
    );
    throw new Error("Error creating order");
  }
};

module.exports = { createOrder };
