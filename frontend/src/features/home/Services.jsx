 
 
import { motion } from "framer-motion";

import {
  Smartphone,
  Monitor,
  Zap,
  Fuel,
  ShieldCheck,
  Construction,
  Fingerprint,
  HandCoins,
} from "lucide-react";

const services = [
  {
    title: "Mobile Recharge",
    description: "Instant prepaid & postpaid recharge for all operators.",
    icon: Smartphone,
    color: "from-[#ff9068] to-[#ff5e62]",
  },
  {
    title: "DTH Recharge",
    description: "Recharge any DTH provider in seconds.",
    icon: Monitor,
    color: "from-[#38bdf8] to-[#06d6e9]",
  },
  {
    title: "Electricity Bill",
    description: "Pay electricity bills from any state instantly.",
    icon: Zap,
    color: "from-[#34d399] to-[#2dd4bf]",
  },
  {
    title: "Gas Bill",
    description: "Pay PNG & LPG gas bills securely.",
    icon: Fuel,
    color: "from-[#fbbf24] to-[#f59e0b]",
  },
  {
    title: "Insurance",
    description: "Renew your health or vehicle insurance online.",
    icon: ShieldCheck,
    color: "from-[#a855f7] to-[#6d28d9]",
  },
  {
    title: "FASTag",
    description: "Recharge FASTag for any bank instantly.",
    icon: Construction,
    color: "from-[#06b6d4] to-[#2563eb]",
  },
  {
    title: "AEPS / Micro ATM",
    description: "Cash withdrawal, mini statement & balance check.",
    icon: Fingerprint,
    color: "from-[#06b6d4] to-[#4f46e5]",
  },
  {
    title: "Loan / EMI",
    description: "Pay EMI, broadband or postpaid bills easily.",
    icon: HandCoins,
    color: "from-[#fb7185] to-[#ec4899]",
  },
];

const Services = () => {
  return (
    <section className="w-full py-20 px-5 sm:px-8 bg-transparent">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >

          <span className="inline-block px-5 py-2 rounded-full bg-white text-[#369fa3] text-sm font-semibold border border-[#d5eeee] shadow-sm mb-5">
            What We Offer
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Our <span className="text-[#55b9b5]">Tech Services</span>
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-500 text-base sm:text-lg md:text-xl leading-relaxed">
            Explore our wide range of technology solutions
            designed to make your digital life easier.
          </p>

        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: (index % 4) * 0.1,
                }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className="group min-h-[300px] flex flex-col items-center justify-center text-center px-6 py-10 rounded-[25px] bg-white border border-[#dff0ef] shadow-[0_8px_30px_rgba(50,120,120,0.06)] hover:shadow-[0_15px_40px_rgba(50,150,150,0.15)] hover:border-[#55b9b5]/50 transition-all duration-300 cursor-pointer"
              >

                {/* Icon */}
                <div
                  className={`w-[76px] h-[76px] rounded-2xl flex items-center justify-center bg-gradient-to-br ${service.color} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                >
                  <Icon
                    size={35}
                    strokeWidth={2.5}
                    className="text-white"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mt-7 group-hover:text-[#369fa3] transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-base leading-relaxed mt-3 max-w-[270px]">
                  {service.description}
                </p>

                {/* Bottom Accent */}
                <div className="w-10 h-1 rounded-full bg-[#55b9b5]/30 mt-6 group-hover:w-20 group-hover:bg-[#55b9b5] transition-all duration-300" />

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Services;
 

