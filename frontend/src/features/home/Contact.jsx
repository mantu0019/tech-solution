 
 
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Headphones,
  ArrowRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "support@techsolution.com",
      description: "Send us an email anytime.",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+91 98765 43210",
      description: "Mon - Sat, 9 AM to 6 PM.",
    },
    {
      icon: MapPin,
      title: "Our Location",
      value: "Bihar, India",
      description: "Serving customers across India.",
    },
    {
      icon: Clock,
      title: "Working Hours",
      value: "24/7 Online Support",
      description: "We are always here to help.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Connect your backend API here.
    alert("Thank you! Your message has been submitted.");
  };

  return (
    <div className="w-full bg-transparent overflow-hidden">

      {/* HERO SECTION */}
      <section className="px-5 sm:px-8 pt-20 pb-16">

        <div className="max-w-7xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >

            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#d5eeee] text-[#369fa3] text-sm font-semibold shadow-sm mb-7">
              <span className="w-2 h-2 rounded-full bg-[#55b9b5] animate-pulse" />
              Get In Touch
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Let's Start A
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#55b9b5] to-[#258b91]">
                Conversation.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto mt-7 text-gray-600 text-base sm:text-lg leading-relaxed">
              Have a question, suggestion or need assistance?
              We'd love to hear from you. Get in touch with
              our team and we'll be happy to help.
            </p>

          </motion.div>
        </div>
      </section>

      {/* CONTACT INFORMATION */}
      <section className="px-5 sm:px-8 py-10">

        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {contactInfo.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-[25px] p-7 border border-[#dff0ef] shadow-[0_8px_30px_rgba(50,120,120,0.06)] hover:shadow-[0_15px_40px_rgba(50,150,150,0.12)] transition-all duration-300"
                >

                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#55b9b5] to-[#369fa3] flex items-center justify-center shadow-lg">
                    <Icon size={27} className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mt-6">
                    {item.title}
                  </h3>

                  <p className="text-[#369fa3] font-semibold mt-3 break-words">
                    {item.value}
                  </p>

                  <p className="text-gray-500 text-sm mt-2">
                    {item.description}
                  </p>

                </motion.div>
              );
            })}

          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className="px-5 sm:px-8 py-20">

        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >

              <span className="inline-block px-5 py-2 rounded-full bg-white text-[#369fa3] text-sm font-semibold border border-[#d5eeee] shadow-sm mb-6">
                Contact Our Team
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                We're Here To
                <span className="block text-[#55b9b5]">
                  Help You.
                </span>
              </h2>

              <p className="text-gray-500 text-base sm:text-lg leading-relaxed mt-6">
                Whether you have questions about our services,
                need technical support or want to share feedback,
                feel free to contact us.
              </p>

              {/* Support Card */}
              <div className="mt-10 bg-gradient-to-br from-[#55b9b5] to-[#258b91] rounded-[30px] p-8 sm:p-10 text-white shadow-[0_15px_40px_rgba(50,150,150,0.2)]">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Headphones size={30} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">
                      Need Immediate Help?
                    </h3>

                    <p className="text-white/80 text-sm mt-1">
                      Our support team is ready to assist you.
                    </p>
                  </div>

                </div>

                <div className="h-px bg-white/20 my-7" />

                <div className="flex items-center justify-between gap-4 flex-wrap">

                  <div>
                    <p className="text-white/75 text-sm">
                      Contact Support
                    </p>

                    <p className="text-xl font-bold mt-1">
                      +91 98765 43210
                    </p>
                  </div>

                  <a
                    href="tel:+919876543210"
                    className="w-12 h-12 rounded-full bg-white text-[#369fa3] flex items-center justify-center hover:scale-110 transition-transform"
                    aria-label="Call support"
                  >
                    <Phone size={22} />
                  </a>

                </div>

              </div>

              {/* Social Links */}
              <div className="mt-10">

                <h3 className="text-lg font-bold text-gray-800">
                  Follow Us
                </h3>

                <div className="flex gap-4 mt-5">

                  {[FaFacebookF, FaInstagram, FaInstagram].map((Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      aria-label={`Social media ${index + 1}`}
                      className="w-12 h-12 rounded-full bg-white border border-[#dff0ef] text-[#369fa3] flex items-center justify-center hover:bg-[#369fa3] hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm"
                    >
                      <Icon size={21} />
                    </a>
                  ))}

                </div>

              </div>

            </motion.div>

            {/* RIGHT CONTACT FORM */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-[30px] p-7 sm:p-10 border border-[#dff0ef] shadow-[0_15px_50px_rgba(50,120,120,0.09)]"
            >

              <div className="mb-8">

                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  Send Us A Message
                </h2>

                <p className="text-gray-500 mt-3">
                  Fill out the form below and we'll get back to you.
                </p>

              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    required
                    minLength={3}
                    maxLength={50}
                    className="w-full px-5 py-4 rounded-xl bg-[#f8fcfc] border border-[#dff0ef] outline-none focus:border-[#55b9b5] focus:ring-2 focus:ring-[#55b9b5]/20 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-[#f8fcfc] border border-[#dff0ef] outline-none focus:border-[#55b9b5] focus:ring-2 focus:ring-[#55b9b5]/20 transition-all"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    placeholder="What is this regarding?"
                    required
                    maxLength={100}
                    className="w-full px-5 py-4 rounded-xl bg-[#f8fcfc] border border-[#dff0ef] outline-none focus:border-[#55b9b5] focus:ring-2 focus:ring-[#55b9b5]/20 transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Message
                  </label>

                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Write your message here..."
                    required
                    minLength={10}
                    maxLength={2000}
                    className="w-full px-5 py-4 rounded-xl bg-[#f8fcfc] border border-[#dff0ef] outline-none resize-none focus:border-[#55b9b5] focus:ring-2 focus:ring-[#55b9b5]/20 transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-[#55b9b5] to-[#369fa3] text-white font-bold shadow-lg hover:-translate-y-1 hover:shadow-xl active:scale-95 transition-all duration-300"
                >
                  Send Message
                  <Send size={19} />
                </button>

              </form>

            </motion.div>

          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-5 sm:px-8 py-16">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center bg-white/80 backdrop-blur-md border border-white rounded-[35px] p-10 sm:p-14 shadow-[0_15px_50px_rgba(50,120,120,0.08)]"
        >

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#55b9b5] to-[#369fa3] flex items-center justify-center mx-auto shadow-lg">
            <MessageCircle size={32} className="text-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-7">
            Let's Connect And
            <span className="block text-[#55b9b5] mt-2">
              Make Things Happen.
            </span>
          </h2>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto leading-relaxed">
            Your ideas, questions and feedback matter to us.
            We look forward to hearing from you.
          </p>

          <a
            href="mailto:support@techsolution.com"
            className="inline-flex items-center gap-3 mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-[#55b9b5] to-[#369fa3] text-white font-bold shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Email Us
            <ArrowRight size={19} />
          </a>

        </motion.div>

      </section>

    </div>
  );
};

export default Contact;
 
