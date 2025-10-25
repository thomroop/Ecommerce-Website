// @desc    Email Utility - Sends OTP and notification emails using Nodemailer
// @route   Utility Function
// @access  Private (used internally for user authentication flows)

import nodemailer from "nodemailer";

/**
 * @desc    Send a styled OTP email for password reset or verification
 * @param   {string} to - Recipient's email address
 * @param   {string} subject - Subject of the email
 * @param   {string} otp - One-Time Password for verification or password reset
 * @access  Private
 */
const sendEmail = async (to, subject, otp) => {
  try {
    // ✅ Configure SMTP transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // false for TLS (use true for SSL - port 465)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // ✅ Define HTML structure for a styled email template
    const html = `
      <div style="font-family: 'Segoe UI', sans-serif; background-color: #f4f4f4; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: #3b82f6; color: white; text-align: center; padding: 20px 0;">
            <h1 style="margin: 0; font-size: 22px;">Ecommerce Website</h1>
          </div>

          <!-- Body -->
          <div style="padding: 30px; text-align: center;">
            <h2 style="color: #333;">Password Reset Request</h2>
            <p style="color: #555; font-size: 15px; line-height: 22px;">
              Hi there 👋, <br />
              We received a request to reset your password. Use the OTP below to complete the process.
            </p>

            <!-- OTP Box -->
            <div style="background: #f0f9ff; color: #0f172a; padding: 15px; font-size: 24px; font-weight: bold; border-radius: 8px; letter-spacing: 2px; display: inline-block; margin: 20px 0;">
              ${otp}
            </div>

            <p style="color: #888; font-size: 14px;">
              This OTP is valid for <b>10 minutes</b>. If you didn’t request a password reset, you can safely ignore this email.
            </p>

            <!-- Call-to-action button -->
            <a href="${process.env.FRONTEND_URL}/reset-password" 
              style="display: inline-block; margin-top: 20px; background: #3b82f6; color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: 500;">
              Reset Password
            </a>
          </div>

          <!-- Footer -->
          <div style="background: #f1f5f9; color: #6b7280; text-align: center; padding: 15px; font-size: 12px;">
            &copy; ${new Date().getFullYear()} Ecommerce Website. All rights reserved.
          </div>
        </div>
      </div>
    `;

    // ✅ Define mail options
    const mailOptions = {
      from: process.env.SMTP_FROM, // Sender email address (from .env)
      to, // Recipient
      subject, // Subject line
      html, // HTML email content
    };

    // ✅ Send the email
    await transporter.sendMail(mailOptions);
    console.log(`📧 Styled OTP email sent successfully to ${to}`);
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw new Error("Email sending failed");
  }
};

export default sendEmail;

