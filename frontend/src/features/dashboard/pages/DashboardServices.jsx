 
import React, { useEffect, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import useAuth from "../../auth/hooks/useAuth";
import { Link } from "react-router";

 
const DashboardServices = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
   
 const {isLoading,authData} =  useAuth()
  const slides = [
    [
      { name: "Aadhaar Services", image: "/images/adhar.jpg" },
      { name: "Pincode Search", image: "/images/adhar.jpg" },
      { name: "Voter Services", image: "/images/vote.jpg" },
      { name: "Bank IFSC", image: "/images/gst.jpg" },
      { name: "Verification", image: "/images/adhar.jpg" },
      { name: "PAN Card", image: "/images/pan.png" },
    ],
    [
      { name: "PAN Services", image: "/images/pan.png" },
      { name: "Ration Services", image: "/images/rasan-seva.jpg" },
      { name: "Vehicle Services", image: "/images/bikes.jpg" },
      { name: "GST Services", image: "/images/gst.jpg" },
      { name: "Farmer Services", image: "/images/farmer.jpg" },
      { name: "Download", image: "/images/rasan-seva.jpg" },
    ],
    [
      { name: "E-Shram", image: "/images/e sharm.jpg" },
      { name: "ABHA Card", image: "/images/adhar.jpg" },
      { name: "Family ID", image: "/images/vote.jpg" },
      { name: "Documents", image: "/images/pan.png" },
      { name: "Aadhaar Verify", image: "/images/adhar.jpg" },
      { name: "Banking", image: "/images/gst.jpg" },
    ],
  ];

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
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

 const services = [
  { name: "Aadhaar Services", slug: "aadhaar", image: "/images/adhar.jpg" },
  { name: "Pan Card Services", slug: "pan-card", image: "/images/pan.png" },
  { name: "Vehicle Services", slug: "vehicle", image: "/images/bikes.jpg" },
  { name: "Ration Services", slug: "ration", image: "/images/rasan-seva.jpg" },
  { name: "Voter Services", slug: "voter", image: "/images/vote.jpg" },
  { name: "Farmer Services", slug: "farmer", image: "/images/farmer.jpg" },
  { name: "Eshram Services", slug: "eshram", image: "/images/e sharm.jpg" },
  { name: "Samgra Download", slug: "samagra", image: "/images/rasan-seva.jpg" },
  { name: "Abha Card image", slug: "abha", image: "/images/adhar.jpg" },
  { name: "GST Services", slug: "gst", image: "/images/gst.jpg" },
  { name: "Family & More", slug: "family", image: "/images/vote.jpg" },
  { name: "Other Services", slug: "other", image: "/images/pan.png" },
];

  return (
    <div className="w-full min-w-0">

      {/* Greeting */}
      <h2 className="mb-4 text-base sm:text-lg font-semibold text-gray-800">
        Hi,  {authData.userData.fullName}
      </h2>

      {/* Carousel */}
      <section className="relative mb-6 sm:mb-8 overflow-hidden rounded-lg border border-[#d5eeee] bg-white p-1">

        <div className="relative min-h-[190px] sm:min-h-[155px] lg:min-h-[170px] flex items-center rounded-md bg-[#66849d] overflow-hidden">

          {/* Slides */}
          <div
            key={currentSlide}
            className="grid w-full grid-cols-3 gap-y-5 gap-x-2 px-8 sm:px-10 py-6 sm:grid-cols-6"
          >
            {slides[currentSlide].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-2 text-center text-white min-w-0"
              >

                <div className="h-20 w-20 sm:h-16 sm:w-16 lg:h-20 lg:w-20 shrink-0 overflow-hidden rounded bg-white">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <span className="text-[10px] sm:text-xs lg:text-sm font-medium leading-tight">
                  {item.name}
                </span>

              </div>
            ))}
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

  {services.map((service, index) => (

    <Link
      key={index}
      to={`/dashboard/${service.slug}`}
      className="group flex min-h-[135px] sm:min-h-[155px] flex-col items-center justify-center rounded-md border border-gray-200 bg-white px-2 sm:px-3 py-4 transition-colors duration-200 hover:border-[#55b9b5] cursor-pointer"
    >

      <div className="flex h-29 w-29 sm:h-20 sm:w-20 items-center justify-center overflow-hidden rounded">

        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
        />

      </div>

      <div className="my-3 w-full border-t border-gray-200" />

      <h3 className="text-center text-xs sm:text-sm font-medium text-gray-700 leading-snug">
        {service.name}
      </h3>

    </Link>

  ))}

</section>

    </div>
  );
};

export default DashboardServices;
 