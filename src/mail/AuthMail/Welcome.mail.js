const verifyMailtransporter = require("../mail.config");
// const { PROJECTURL } = process.env;

const welcomeEmail = async ({ name, email }) => {
  const mailOptions = {
    from: "Sagar Library",
    to: email,
    subject: "Welcome to Sagar Library - Your Journey Begins!",
    html: ` <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Sagar Library</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #2c3e50;
            }
            .batch-details, .timing-details {
                margin: 20px 0;
            }
            .batch-details ul, .timing-details ul {
                list-style: none;
                padding: 0;
            }
            .batch-details li, .timing-details li {
                margin-bottom: 10px;
                font-size: 16px;
            }
            .support {
                margin-top: 30px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to Sagar Library!</h1>

            <p>Dear ${name},</p>
            <p>We are excited to have you join us in the Sagar Library.</p>
            <div class="batch-details">
                <h2>Available Batches:</h2>
                <ul>
                    <li><strong>Alpha Batch:</strong> 3 months</li>
                    <li><strong>Beta Batch:</strong> 6 months</li>
                    <li><strong>Gama Batch:</strong> 12 months</li>
                    <li><strong>One-Month Batch:</strong> 1 month</li>
                </ul>
            </div>

            <div class="timing-details">
                <h2>Available Timings:</h2>
                <ul>
                    <li><strong>6:00 AM - 10:00 PM</strong></li>
                    <li><strong>10:00 AM - 2:00 PM</strong></li>
                    <li><strong>2:00 PM - 6:00 PM</strong></li>
                </ul>
            </div>

            <p>At Sagar Library, we are committed to providing you with an enriching learning experience. Feel free to explore our extensive collection of resources and take full advantage of the opportunities available to you.</p>

            <p class="support">If you need any assistance, our support team is always here to help.</p>

            <h2>Welcome aboard!</h2>

            <p>Best regards,</p>
            <p><strong>The Sagar Library Team</strong></p>
        </div>
    </body>
    </html>`,
  };

  verifyMailtransporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
  });

  return true;
};

module.exports = welcomeEmail;
