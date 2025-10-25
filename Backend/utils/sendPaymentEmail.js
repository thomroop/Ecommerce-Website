// @desc    Email Utility - Sends styled payment confirmation or failure emails after Stripe transactions
// @route   Utility Function
// @access  Private (used internally after payment processing)

import nodemailer from "nodemailer";

const sendPaymentEmail = async (to, subject, amount, status, paymentId) => {
  try {
    console.log("📨 Preparing to send email..."); // ✅ Step 1
    console.log(`➡️ Email details:
      To: ${to}
      Subject: ${subject}
      Amount: ₹${amount}
      Status: ${status}
      Payment ID: ${paymentId}
    `);

    const color = status === "success" ? "#16a34a" : "#dc2626";
    const title =
      status === "success" ? "Payment Successful 🎉" : "Payment Failed ❌";
    const message =
      status === "success"
        ? `Your payment of <b>₹${amount}</b> has been processed successfully.`
        : `Unfortunately, your payment of <b>₹${amount}</b> could not be processed.`;

    const html = `
      <div style="font-family: 'Segoe UI', sans-serif; background-color: #f9fafb; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          <div style="background: ${color}; color: white; text-align: center; padding: 20px 0;">
            <h1 style="margin: 0; font-size: 22px;">${title}</h1>
          </div>
          <div style="padding: 30px; text-align: center;">
            <p style="color: #333; font-size: 16px; line-height: 22px;">
              ${message}
            </p>
            <p style="color: #555;">Payment ID: <b>${paymentId}</b></p>
            <p style="color: #777; font-size: 13px; margin-top: 20px;">
              ${
                status === "success"
                  ? "Your order will be processed shortly. Thank you for shopping with us!"
                  : "Please try again or contact our support team if the issue persists."
              }
            </p>
          </div>
          <div style="background: #f1f5f9; color: #6b7280; text-align: center; padding: 15px; font-size: 12px;">
            &copy; ${new Date().getFullYear()} Ecommerce Website. All rights reserved.
          </div>
        </div>
      </div>
    `;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent successfully!");
    console.log("📬 Message ID:", info.messageId);
    console.log(
      "📧 Preview URL (for dev mode):",
      nodemailer.getTestMessageUrl(info)
    );
  } catch (error) {
    console.error("❌ Failed to send payment email:", error.message);
  }
};

export default sendPaymentEmail;

