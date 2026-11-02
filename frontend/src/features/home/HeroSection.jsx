 
import { Link } from "react-router";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-[calc(100vh-90px)] overflow-hidden flex items-center bg-transparent">

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-20 w-full">

        <div className="max-w-4xl mx-auto text-center">

          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#d5eeee] shadow-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#55b9b5] animate-pulse" />

            <span className="text-sm font-semibold text-[#369fa3]">
              Welcome to TechSolution
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight"
          >
            Explore The Future
            <br />

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#55b9b5] to-[#258b91]">
              Of Technology.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto mt-7 text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed"
          >
            Your Daily Dose of Technology Insights.
            Discover the latest tech trends, AI innovations,
            gadgets, programming and everything shaping
            our digital world.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10"
          >

            {/* Login Button */}
            <Link
              to="/login"
              className="group relative px-9 py-4 w-full sm:w-auto overflow-hidden rounded-full bg-gradient-to-r from-[#55b9b5] to-[#369fa3] text-white font-bold text-base shadow-[0_10px_30px_rgba(65,170,170,0.3)] hover:shadow-[0_15px_35px_rgba(65,170,170,0.4)] hover:-translate-y-1 active:scale-95 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Get Started

                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </span>
            </Link>

            {/* Explore Button */}
            <Link
              to="/services"
              className="px-9 py-4 w-full sm:w-auto rounded-full bg-white text-gray-800 font-semibold border border-gray-200 hover:border-[#55b9b5] hover:text-[#369fa3] hover:-translate-y-1 transition-all duration-300 shadow-sm text-center"
            >
              Explore Technology
            </Link>

          </motion.div>

          {/* Technology Tags */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-16"
          >

            {[
              "Artificial Intelligence",
              "Web Development",
              "Gadgets",
              "Tech News",
              "Innovation",
            ].map((item) => (
              <motion.span
                key={item}
                whileHover={{ y: -5, scale: 1.05 }}
                className="px-5 py-2.5 bg-white/80 backdrop-blur-md border border-[#d5eeee] rounded-full text-sm font-medium text-gray-600 shadow-sm cursor-default"
              >
                {item}
              </motion.span>
            ))}

          </motion.div>

          {/* Bottom Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 text-sm text-gray-400"
          >
            Discover · Learn · Innovate · Grow
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
 
