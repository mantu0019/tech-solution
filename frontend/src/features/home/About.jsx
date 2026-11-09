    
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Rocket,
  ShieldCheck,
  Lightbulb,
  Users,
  Zap,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";

const About = () => {
  const stats = [
    { number: "10K+", label: "Happy Users" },
    { number: "50+", label: "Riya Cyber Cafe" },
    { number: "99.9%", label: "Service Uptime" },
    { number: "24/7", label: "Customer Support" },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: "Security First",
      description:
        "We prioritize your privacy and security with reliable and secure digital solutions.",
      color: "from-[#55b9b5] to-[#369fa3]",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We continuously explore new technologies to make your digital experience better.",
      color: "from-[#fbbf24] to-[#f59e0b]",
    },
    {
      icon: HeartHandshake,
      title: "Customer First",
      description:
        "Your satisfaction is our priority. We focus on delivering a smooth user experience.",
      color: "from-[#a855f7] to-[#6d28d9]",
    },
    {
      icon: Rocket,
      title: "Fast & Reliable",
      description:
        "We believe technology should be fast, accessible and easy for everyone.",
      color: "from-[#38bdf8] to-[#2563eb]",
    },
  ];

  return (
    <div className="w-full bg-transparent overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative px-5 sm:px-8 pt-20 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#d5eeee] text-[#369fa3] text-sm font-semibold shadow-sm mb-7">
                <span className="w-2 h-2 capitalize rounded-full bg-[#55b9b5] animate-pulse" />
                About Riya cyber cafe
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
                Aapka Har Kaam
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#55b9b5] to-[#258b91]">
                  Hamari Zimmedari.
                </span>
              </h1>

              <p className="mt-7 text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Riya Cyber Cafe mein hum maante hain ki technology hamari
                zindagi ko aasan aur behtar bana sakti hai. Hamara maksad hai
                aapko modern digital services provide karna, taaki aapke
                rozmarra ke online aur sarkari kaam aasani, suvidha aur bharose
                ke saath poore ho sakein.
              </p>

              <div className="flex flex-wrap gap-4 mt-9">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#55b9b5] to-[#369fa3] text-white font-semibold shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  Explore Services
                  <ArrowRight size={19} />
                </Link>

                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-full bg-white border border-gray-200 text-gray-700 font-semibold hover:border-[#55b9b5] hover:text-[#369fa3] transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              className="relative"
            >
              <div className="relative max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[#55b9b5]/20 to-[#369fa3]/10 rounded-[45px] rotate-6" />

                <div className="relative bg-white/80 backdrop-blur-xl border border-white rounded-[40px] p-8 sm:p-12 shadow-[0_20px_60px_rgba(50,120,120,0.12)]">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#55b9b5] to-[#369fa3] flex items-center justify-center shadow-lg mx-auto">
                    <Zap size={42} className="text-white" />
                  </div>

                  <h2 className="text-3xl font-extrabold text-gray-900 text-center mt-8">
                    Riya Cyber Cafe
                  </h2>

                  <p className="text-gray-500 text-center mt-3">
                    Technology for Everyone
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-10">
                    <div className="bg-[#eaf7f7] rounded-2xl p-5 text-center">
                      <ShieldCheck
                        className="mx-auto text-[#369fa3]"
                        size={30}
                      />
                      <p className="font-bold text-gray-800 mt-3">Secure</p>
                    </div>

                    <div className="bg-[#eaf7f7] rounded-2xl p-5 text-center">
                      <Rocket className="mx-auto text-[#369fa3]" size={30} />
                      <p className="font-bold text-gray-800 mt-3">Reliable</p>
                    </div>

                    <div className="bg-[#eaf7f7] rounded-2xl p-5 text-center">
                      <Users className="mx-auto text-[#369fa3]" size={30} />
                      <p className="font-bold text-gray-800 mt-3">
                        User Friendly
                      </p>
                    </div>

                    <div className="bg-[#eaf7f7] rounded-2xl p-5 text-center">
                      <Lightbulb className="mx-auto text-[#369fa3]" size={30} />
                      <p className="font-bold text-gray-800 mt-3">Innovative</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="px-5 sm:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-md border border-white rounded-3xl p-7 text-center shadow-[0_8px_30px_rgba(50,120,120,0.07)] hover:-translate-y-2 transition-all duration-300"
              >
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#369fa3]">
                  {stat.number}
                </h3>

                <p className="text-gray-500 text-sm sm:text-base font-medium mt-3">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="px-5 sm:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 rounded-full bg-white text-[#369fa3] text-sm font-semibold border border-[#d5eeee] shadow-sm mb-5">
              What Drives Us
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
              Our Mission & <span className="text-[#55b9b5]">Vision</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[30px] p-8 sm:p-10 border border-[#dff0ef] shadow-[0_8px_30px_rgba(50,120,120,0.06)]"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#55b9b5] to-[#369fa3] flex items-center justify-center shadow-lg">
                <Target size={32} className="text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-7">
                Our Mission
              </h3>

              <p className="text-gray-500 leading-relaxed mt-4">
                Hamari mission hai ki digital technology har kisi ke liye aasaan
                aur accessible ho. Hum bharosemand, modern aur user-friendly
                digital services provide karte hain, jo aapke rozmarra ke kaamon
                ko aasan aur suvidhajanak banati hain.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-[30px] p-8 sm:p-10 border border-[#dff0ef] shadow-[0_8px_30px_rgba(50,120,120,0.06)]"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#38bdf8] to-[#2563eb] flex items-center justify-center shadow-lg">
                <Eye size={32} className="text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-7">
                Our Vision
              </h3>

              <p className="text-gray-500 leading-relaxed mt-4">
                Hamara vision hai ek aisa smart digital ecosystem banana, jahan
                har koi zaroori digital services aur technology ka fayda jaldi,
                surakshit aur bina kisi pareshani ke utha sake.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="px-5 sm:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-5 py-2 rounded-full bg-white text-[#369fa3] text-sm font-semibold border border-[#d5eeee] shadow-sm mb-5">
              Our Principles
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
              What Makes Us <span className="text-[#55b9b5]">Different?</span>
            </h2>

            <p className="max-w-2xl mx-auto mt-6 text-gray-500 text-base sm:text-lg leading-relaxed">
              We focus on the things that matter most to create a better and
              more reliable digital experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -10 }}
                  className="group bg-white rounded-[25px] p-8 border border-[#dff0ef] shadow-[0_8px_30px_rgba(50,120,120,0.06)] hover:shadow-[0_15px_40px_rgba(50,150,150,0.15)] transition-all duration-300"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={30} className="text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mt-7 group-hover:text-[#369fa3] transition-colors">
                    {value.title}
                  </h3>

                  <p className="text-gray-500 leading-relaxed mt-4">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-5 sm:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-5 py-2 rounded-full bg-white text-[#369fa3] text-sm font-semibold border border-[#d5eeee] shadow-sm mb-5">
                Why Choose Us
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                Technology That
                <span className="block text-[#55b9b5]">Works For You.</span>
              </h2>

              <p className="text-gray-500 mt-6 leading-relaxed">
                We aim to bring essential digital services together in one
                convenient place, making your everyday digital activities
                simpler and easier.
              </p>

              <div className="space-y-5 mt-9">
                {[
                  "Simple and user-friendly platform",
                  "Secure and reliable experience",
                  "Modern technology solutions",
                  "Convenient access to digital services",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2
                      size={22}
                      className="text-[#369fa3] shrink-0"
                    />

                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-gradient-to-br from-[#55b9b5] to-[#258b91] rounded-[35px] p-9 sm:p-12 text-white shadow-[0_20px_50px_rgba(50,150,150,0.2)]"
            >
              <Rocket size={48} className="mb-8" />

              <h3 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Har Digital Suvidha, Ab Aapke Kareeb.
              </h3>

              <p className="text-white/85 mt-6 leading-relaxed">
                Technology duniya ko tezi se badal rahi hai. Hamara maksad hai
                is badlav ko har kisi ke liye aasan, sulabh aur faydemand
                banana, taaki sabhi log digital services ka behtar labh utha
                sakein. Technology is changing the world. We are here to make
                that change easier, accessible and meaningful for everyone.
              </p>

              <Link
                to="/contact"
                className="inline-flex items-center gap-3 mt-9 px-7 py-4 rounded-full bg-white text-[#319fa1] font-bold hover:-translate-y-1 transition-all duration-300 shadow-lg"
              >
                Get In Touch
                <ArrowRight size={19} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-5 sm:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center bg-white/80 backdrop-blur-md border border-white rounded-[35px] p-10 sm:p-16 shadow-[0_15px_50px_rgba(50,120,120,0.08)]"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Ready To Explore The
            <span className="block text-[#55b9b5] mt-2">
             Riya Cyber Cafe
            </span>
          </h2>

          <p className="text-gray-500 mt-6 max-w-2xl mx-auto leading-relaxed">
            Discover our digital solutions and take your experience to the next
            level.
          </p>

          <Link
            to="/services"
            className="inline-flex items-center gap-3 mt-9 px-9 py-4 rounded-full bg-gradient-to-r from-[#55b9b5] to-[#369fa3] text-white font-bold shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            Explore Our Services
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
