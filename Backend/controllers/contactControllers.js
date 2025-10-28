import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Save to database
    const newContact = await Contact.create({ name, email, message });

    // ✅ Optional: Send email notification (configure if needed)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER, // your Gmail or support email
        pass: process.env.SMTP_PASS, // app password
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.SMTP_USER,
      subject: `New Contact Message from ${name}`,
      text: `
        📧 New message received:
        -----------------------
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "✅ Message sent successfully! We'll get back to you soon.",
      contact: newContact,
    });
  } catch (error) {
    console.error("❌ Contact submission error:", error);
    res.status(500).json({ message: "Something went wrong, please try again later." });
  }
};
