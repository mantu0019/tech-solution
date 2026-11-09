import React, { useEffect, useState } from "react";

import {
  Bike,
  Utensils,
  Vote,
  Sprout,
  HardHat,
  Download,
  HeartPulse,
  ReceiptText,
  Users,
  FolderDown,
  MapPin,
  Landmark,
  ShieldCheck,
  Fingerprint,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  IdCard,
} from "lucide-react";

const DashboardServices = () => {

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    [
      { name: "Aadhaar Services", icon: Fingerprint },
      { name: "Pincode Search", icon: MapPin },
      { name: "Voter Services", icon: Vote },
      { name: "Bank IFSC", icon: Landmark },
      { name: "Verification", icon: ShieldCheck },
      { name: "PAN Card", icon: CreditCard },
    ],
    [
      { name: "PAN Services", icon: IdCard },
      { name: "Ration Services", icon: Utensils },
      { name: "Vehicle Services", icon: Bike },
      { name: "GST Services", icon: ReceiptText },
      { name: "Farmer Services", icon: Sprout },
      { name: "Download", icon: Download },
    ],
    [
      { name: "E-Shram", icon: HardHat },
      { name: "ABHA Card", icon: HeartPulse },
      { name: "Family ID", icon: Users },
      { name: "Documents", icon: FolderDown },
      { name: "Aadhaar Verify", icon: ShieldCheck },
      { name: "Banking", icon: Landmark },
    ],
  ];

  // Auto Carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const services = [
    { name: "Aadhaar Services", icon: Fingerprint },
    { name: "Pan Card Services", icon: CreditCard },
    { name: "Vehicle Services", icon: Bike },
    { name: "Ration Services", icon: Utensils },
    { name: "Voter Services", icon: Vote },
    { name: "Farmer Services", icon: Sprout },
    { name: "Eshram Services", icon: HardHat },
    { name: "Samgra Download", icon: Download },
    { name: "Abha Card image", icon: HeartPulse },
    { name: "GST Services", icon: ReceiptText },
    { name: "Family & More", icon: Users },
    { name: "Other Services", icon: FolderDown },
  ];

  return (
    <div className="w-full min-w-0">

      {/* Greeting */}
      <h2 className="mb-4 text-base sm:text-lg font-semibold text-gray-800">
        Hi, Welcome Back
      </h2>

      {/* Carousel */}
      <section className="relative mb-6 sm:mb-8 overflow-hidden rounded-lg border border-[#d5eeee] bg-white p-1">

        <div className="relative min-h-[190px] sm:min-h-[155px] lg:min-h-[170px] flex items-center rounded-md bg-[#66849d] overflow-hidden">

          {/* Slides */}
          <div
            key={currentSlide}
            className="grid w-full grid-cols-3 gap-y-5 gap-x-2 px-8 sm:px-10 py-6 sm:grid-cols-6"
          >
            {slides[currentSlide].map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center gap-2 text-center text-white min-w-0"
                >

                  <div className="flex h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <Icon
                      size={28}
                      strokeWidth={1.7}
                      className="sm:w-9 sm:h-9"
                    />
                  </div>

                  <span className="text-[10px] sm:text-xs lg:text-sm font-medium leading-tight">
                    {item.name}
                  </span>

                </div>
              );
            })}
          </div>

          {/* Previous */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white text-[#369fa3] shadow-sm hover:bg-[#effafa]"
          >
            <ChevronLeft size={19} />
          </button>

          {/* Next */}
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white text-[#369fa3] shadow-sm hover:bg-[#effafa]"
          >
            <ChevronRight size={19} />
          </button>

        </div>

        {/* Dots */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">

          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                currentSlide === index
                  ? "w-5 bg-white"
                  : "w-1.5 bg-white/50"
              }`}
            />
          ))}

        </div>

      </section>

      {/* Services Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 sm:gap-4">

        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <div
              key={index}
              className="group flex min-h-[135px] sm:min-h-[155px] flex-col items-center justify-center rounded-md border border-gray-200 bg-white px-2 sm:px-3 py-4 transition-colors duration-200 hover:border-[#55b9b5]"
            >

              {/* Icon */}
              <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center text-[#369fa3]">

                <Icon
                  size={36}
                  strokeWidth={1.5}
                  className="sm:w-11 sm:h-11"
                />

              </div>

              {/* Divider */}
              <div className="my-3 w-full border-t border-gray-200" />

              {/* Title */}
              <h3 className="text-center text-xs sm:text-sm font-medium text-gray-700 leading-snug">
                {service.name}
              </h3>

            </div>
          );
        })}

      </section>

    </div>
  );
};

export default DashboardServices;