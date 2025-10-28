import React, { useState } from "react";
import { toast } from "react-toastify";
import PageWrapper from "../../components/common/PageWrapper";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all required fields ❌");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Message sent successfully! ✅");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(data.message || "Something went wrong ❌");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Unable to send message at the moment ❌");
    }
  };

  return (
    <PageWrapper>
      <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">
          Contact Support
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded h-32 resize-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-teal-600 to-slate-600 text-white py-2 rounded-lg font-semibold shadow-md hover:from-teal-700 hover:to-slate-700 transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </PageWrapper>
  );
};

export default Contact;

