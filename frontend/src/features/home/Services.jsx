// import { motion } from "framer-motion";

// import {
//   Printer,
//   Vote,
//   CreditCard,
//   Smartphone,
//   FileText,
//   House,
//   ClipboardList,
//   Sprout,
//   HardHat,
//   IdCard,
//   Laptop,
//   GraduationCap,
//   HeartPulse,
//   Link,
//   Zap,
//   BadgeCheck,
//   Tractor,
//   FileCheck,
//   Wallet,
//   ReceiptText,
// } from "lucide-react";

 
// const services = [
//   {
//     title: "Aadhaar Card Print",
//     description: "आधार कार्ड प्रिंट एवं संबंधित सेवाएं।",
//     icon: Printer,
//     color: "from-orange-500 to-orange-600",
//   },
//   {
//     title: "Voter Card Apply",
//     description: "नया वोटर कार्ड बनवाएं एवं सुधार करवाएं।",
//     icon: Vote,
//     color: "from-green-500 to-green-600",
//   },
//   {
//     title: "PAN Card Apply",
//     description: "नया पैन कार्ड बनवाएं एवं सुधार करवाएं।",
//     icon: CreditCard,
//     color: "from-blue-500 to-blue-600",
//   },
//   {
//     title: "Mobile Recharge",
//     description: "प्रीपेड एवं पोस्टपेड मोबाइल रिचार्ज करें।",
//     icon: Smartphone,
//     color: "from-purple-500 to-purple-600",
//   },
//   {
//     title: "Caste Certificate",
//     description: "जाति प्रमाण पत्र के लिए ऑनलाइन आवेदन करें।",
//     icon: FileText,
//     color: "from-indigo-500 to-indigo-600",
//   },
//   {
//     title: "Income Certificate",
//     description: "आय प्रमाण पत्र के लिए ऑनलाइन आवेदन करें।",
//     icon: ReceiptText,
//     color: "from-pink-500 to-pink-600",
//   },
//   {
//     title: "Residence Certificate",
//     description: "निवास प्रमाण पत्र के लिए ऑनलाइन आवेदन करें।",
//     icon: House,
//     color: "from-orange-500 to-amber-600",
//   },
//   {
//     title: "Character Certificate",
//     description: "आचरण प्रमाण पत्र के लिए ऑनलाइन आवेदन करें।",
//     icon: FileCheck,
//     color: "from-red-500 to-red-600",
//   },
//   {
//     title: "PF Withdrawal",
//     description: "पीएफ का पैसा निकालने में सहायता प्राप्त करें।",
//     icon: Wallet,
//     color: "from-fuchsia-500 to-purple-600",
//   },
//   {
//     title: "Ration Card Apply",
//     description: "नया राशन कार्ड बनवाएं एवं सुधार करवाएं।",
//     icon: ClipboardList,
//     color: "from-red-500 to-rose-600",
//   },
//   {
//     title: "Farmer Registration",
//     description: "किसान पंजीकरण एवं संबंधित सेवाएं प्राप्त करें।",
//     icon: Sprout,
//     color: "from-green-500 to-emerald-600",
//   },
//   {
//     title: "E-Shram Card",
//     description: "ई-श्रम कार्ड के लिए ऑनलाइन पंजीकरण करें।",
//     icon: HardHat,
//     color: "from-blue-500 to-indigo-600",
//   },
//   {
//     title: "ABC ID Card",
//     description: "अपनी ABC आईडी ऑनलाइन बनवाएं।",
//     icon: IdCard,
//     color: "from-violet-500 to-purple-600",
//   },
//   {
//     title: "Online Admission",
//     description: "स्कूल एवं कॉलेज में ऑनलाइन प्रवेश लें।",
//     icon: Laptop,
//     color: "from-sky-500 to-blue-600",
//   },
//   {
//     title: "Ayushman Card",
//     description: "आयुष्मान कार्ड बनवाने की सुविधा प्राप्त करें।",
//     icon: HeartPulse,
//     color: "from-orange-500 to-red-500",
//   },
//   {
//     title: "Lagan Receipt",
//     description: "जमीन की ऑनलाइन लगान रसीद कटवाएं।",
//     icon: Link,
//     color: "from-pink-500 to-fuchsia-600",
//   },
//   {
//     title: "Electricity Bill",
//     description: "बिजली बिल का ऑनलाइन भुगतान करें।",
//     icon: Zap,
//     color: "from-amber-500 to-orange-600",
//   },
//   {
//     title: "EWS Certificate",
//     description: "EWS प्रमाण पत्र के लिए ऑनलाइन आवेदन करें।",
//     icon: BadgeCheck,
//     color: "from-green-500 to-emerald-600",
//   },
//   {
//     title: "PM Kisan Apply",
//     description: "पीएम किसान योजना के लिए आवेदन करें।",
//     icon: Tractor,
//     color: "from-blue-600 to-indigo-700",
//   },
//   {
//     title: "Online Form",
//     description: "सभी प्रकार के ऑनलाइन फॉर्म भरवाएं।",
//     icon: GraduationCap,
//     color: "from-violet-500 to-indigo-600",
//   },
// ];
 


// const Services = () => {
//   return (
//     <section className="w-full py-20 px-5 sm:px-8 bg-transparent">
//       <div className="max-w-7xl mx-auto">

//         {/* Heading */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           className="text-center mb-14"
//         >
//           <span className="inline-block px-5 py-2 rounded-full bg-white text-blue-600 text-sm font-semibold border border-blue-100 shadow-sm mb-5">
//             Riya Cyber Cafe
//           </span>

//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
//             हमारी <span className="text-blue-600">सेवाएं</span>
//           </h2>

//           <p className="max-w-3xl mx-auto mt-5 text-gray-500 text-base sm:text-lg leading-relaxed">
//             All Digital, Government and Online Services Available at One Place.
//           </p>
//         </motion.div>

//         {/* Services Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

//           {services.map((service, index) => {
//             const Icon = service.icon;

//             return (
//               <motion.div
//                 key={service.title}
//                 initial={{ opacity: 0, y: 35 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{
//                   duration: 0.45,
//                   delay: (index % 4) * 0.08,
//                 }}
//                 whileHover={{
//                   y: -7,
//                   transition: { duration: 0.25 },
//                 }}
//                 className="group flex items-center gap-4 p-5 min-h-[115px] rounded-2xl bg-white border border-blue-100 shadow-[0_5px_20px_rgba(30,90,150,0.06)] hover:shadow-[0_12px_30px_rgba(30,90,150,0.14)] hover:border-blue-300 transition-all duration-300 cursor-pointer"
//               >
//                 {/* Icon */}
//                 <div
//                   className={`shrink-0 w-[62px] h-[62px] rounded-2xl flex items-center justify-center bg-gradient-to-br ${service.color} shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
//                 >
//                   <Icon
//                     size={29}
//                     strokeWidth={2.2}
//                     className="text-white"
//                   />
//                 </div>

//                 {/* Content */}
//                 <div className="flex-1 min-w-0">
//                   <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
//                     {service.title}
//                   </h3>

//                   <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
//                     {service.description}
//                   </p>
//                 </div>
//               </motion.div>
//             );
//           })}

//         </div>

//       </div>
//     </section>
//   );
// };

// export default Services;





 
import { motion } from "framer-motion";

import {
  Printer,
  Vote,
  CreditCard,
  Smartphone,
  FileText,
  House,
  ClipboardList,
  Sprout,
  HardHat,
  IdCard,
  Laptop,
  GraduationCap,
  HeartPulse,
  Link,
  Zap,
  BadgeCheck,
  Tractor,
  FileCheck,
  Wallet,
  ReceiptText,
} from "lucide-react";

const services = [
  {
    title: "Aadhaar Card Print",
    description: "आधार कार्ड प्रिंट एवं संबंधित सेवाएं।",
    icon: Printer,
    color: "from-orange-500 to-orange-600",
  },
  {
    title: "Voter Card Apply",
    description: "नया वोटर कार्ड बनवाएं एवं सुधार करवाएं।",
    icon: Vote,
    color: "from-green-500 to-green-600",
  },
  {
    title: "PAN Card Apply",
    description: "नया पैन कार्ड बनवाएं एवं सुधार करवाएं।",
    icon: CreditCard,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Mobile Recharge",
    description: "प्रीपेड एवं पोस्टपेड मोबाइल रिचार्ज करें।",
    icon: Smartphone,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Caste Certificate",
    description: "जाति प्रमाण पत्र के लिए ऑनलाइन आवेदन करें।",
    icon: FileText,
    color: "from-indigo-500 to-indigo-600",
  },
  {
    title: "Income Certificate",
    description: "आय प्रमाण पत्र के लिए ऑनलाइन आवेदन करें।",
    icon: ReceiptText,
    color: "from-pink-500 to-pink-600",
  },
  {
    title: "Residence Certificate",
    description: "निवास प्रमाण पत्र के लिए ऑनलाइन आवेदन करें।",
    icon: House,
    color: "from-orange-500 to-amber-600",
  },
  {
    title: "Character Certificate",
    description: "आचरण प्रमाण पत्र के लिए ऑनलाइन आवेदन करें।",
    icon: FileCheck,
    color: "from-red-500 to-red-600",
  },
  {
    title: "PF Withdrawal",
    description: "पीएफ का पैसा निकालने में सहायता प्राप्त करें।",
    icon: Wallet,
    color: "from-fuchsia-500 to-purple-600",
  },
  {
    title: "Ration Card Apply",
    description: "नया राशन कार्ड बनवाएं एवं सुधार करवाएं।",
    icon: ClipboardList,
    color: "from-red-500 to-rose-600",
  },
  {
    title: "Farmer Registration",
    description: "किसान पंजीकरण एवं संबंधित सेवाएं प्राप्त करें।",
    icon: Sprout,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "E-Shram Card",
    description: "ई-श्रम कार्ड के लिए ऑनलाइन पंजीकरण करें।",
    icon: HardHat,
    color: "from-blue-500 to-indigo-600",
  },
  {
    title: "ABC ID Card",
    description: "अपनी ABC आईडी ऑनलाइन बनवाएं।",
    icon: IdCard,
    color: "from-violet-500 to-purple-600",
  },
  {
    title: "Online Admission",
    description: "स्कूल एवं कॉलेज में ऑनलाइन प्रवेश लें।",
    icon: Laptop,
    color: "from-sky-500 to-blue-600",
  },
  {
    title: "Ayushman Card",
    description: "आयुष्मान कार्ड बनवाने की सुविधा प्राप्त करें।",
    icon: HeartPulse,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Lagan Receipt",
    description: "जमीन की ऑनलाइन लगान रसीद कटवाएं।",
    icon: Link,
    color: "from-pink-500 to-fuchsia-600",
  },
  {
    title: "Electricity Bill",
    description: "बिजली बिल का ऑनलाइन भुगतान करें।",
    icon: Zap,
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "EWS Certificate",
    description: "EWS प्रमाण पत्र के लिए ऑनलाइन आवेदन करें।",
    icon: BadgeCheck,
    color: "from-green-500 to-emerald-600",
  },
  {
    title: "PM Kisan Apply",
    description: "पीएम किसान योजना के लिए आवेदन करें।",
    icon: Tractor,
    color: "from-blue-600 to-indigo-700",
  },
  {
    title: "Online Form",
    description: "सभी प्रकार के ऑनलाइन फॉर्म भरवाएं।",
    icon: GraduationCap,
    color: "from-violet-500 to-indigo-600",
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
          className="text-center mb-14"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-white text-blue-600 text-sm font-semibold border border-blue-100 shadow-sm mb-5">
            Riya Cyber Cafe
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            हमारी{" "}
            <span className="text-blue-600">सेवाएं</span>
          </h2>

          <p className="max-w-3xl mx-auto mt-5 text-gray-500 text-base sm:text-lg leading-relaxed">
            सभी डिजिटल, सरकारी एवं ऑनलाइन सेवाएं अब एक ही स्थान पर।
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: (index % 4) * 0.08,
                }}
                whileHover={{
                  y: -7,
                  transition: { duration: 0.25 },
                }}
                className="group relative aspect-square flex flex-col items-center justify-center text-center p-4 sm:p-6 rounded-2xl bg-white border border-blue-100 shadow-[0_5px_20px_rgba(30,90,150,0.06)] hover:shadow-[0_15px_35px_rgba(30,90,150,0.15)] hover:border-blue-300 transition-all duration-300 cursor-pointer overflow-hidden"
              >

                {/* Background Decoration */}
                <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <div
                  className={`relative shrink-0 w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-2xl flex items-center justify-center bg-gradient-to-br ${service.color} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                >
                  <Icon
                    size={32}
                    strokeWidth={2.2}
                    className="text-white"
                  />
                </div>

                {/* Title */}
                <h3 className="relative text-sm sm:text-lg font-bold text-gray-800 mt-4 group-hover:text-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="relative text-[11px] sm:text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">
                  {service.description}
                </p>

                {/* Bottom Accent */}
                <div className="relative w-8 h-1 rounded-full bg-blue-200 mt-4 group-hover:w-14 group-hover:bg-blue-500 transition-all duration-300" />

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Services;
 
