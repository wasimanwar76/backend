const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");

const Subscription = require("./models/Subscription");
const Shift = require("./models/Shift");

const cors = require("cors");
const cron = require("node-cron");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log("DB connection failed", error));

// Schedule a job to run every day at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    const currentDate = new Date();

    // Find subscriptions that are past their end date and not already expired
    const expiredSubscriptions = await Subscription.updateMany(
      {
        end_date: { $lte: currentDate },
        subscription_status: { $ne: "Expired" },
      },
      { subscription_status: "Expired" }
    );

    console.log(
      `Updated ${expiredSubscriptions.nModified} subscriptions to 'Expired' status.`
    );
  } catch (error) {
    console.error("Error updating expired subscriptions:", error);
  }
});

app.get("/api/shifts", async (req, res) => {
  try {
    const shifts = await Shift.find({});
    return res.status(200).json({
      success: true,
      shifts,
    });
  } catch (error) {}
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
