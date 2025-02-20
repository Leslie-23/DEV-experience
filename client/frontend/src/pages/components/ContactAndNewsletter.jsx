import { useState } from "react";

const ContactAndNewsletter = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Contact Form Submitted: ", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Simulate newsletter signup
    console.log("Newsletter Signup: ", newsletterEmail);
    setNewsletterEmail("");
    alert("Thank you for subscribing!");
  };

  return (
    <section id="contact" className="py-16 px-6 bg-gray-50 text-center">
      <h3 className="text-2xl font-semibold text-green-500 mb-6">Contact Us</h3>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Your Name"
          className="w-full p-2 mb-4 border rounded-md"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Your Email"
          className="w-full p-2 mb-4 border rounded-md"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Your Message"
          className="w-full p-2 mb-4 border rounded-md"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          Send Message
        </button>
      </form>
      {submitted && (
        <p className="text-green-500 mt-4">Message sent successfully!</p>
      )}

      <h3 className="text-2xl font-semibold text-green-500 mt-12 mb-6">
        Stay Updated
      </h3>
      <form
        onSubmit={handleNewsletterSubmit}
        className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md flex"
      >
        <input
          type="email"
          value={newsletterEmail}
          onChange={(e) => setNewsletterEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 p-2 border rounded-l-md"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600 transition"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default ContactAndNewsletter;
