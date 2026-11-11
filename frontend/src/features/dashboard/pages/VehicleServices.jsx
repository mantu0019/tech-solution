 
import { Link, Outlet } from "react-router";

const VehicleServices = () => {
  return (
    <>
      <Link
        to="/dashboard/vehicle/ll-request"
        className="flex flex-col items-center justify-center w-[190px] h-[190px] rounded-full bg-[#e1e7ef] shadow-md cursor-pointer hover:scale-105 transition-transform duration-300"
      >
        <div className="w-[100px] h-[100px] flex items-center justify-center">

          {/* Tumhara existing SVG */}
          
        </div>

        <h3 className="text-[16px] font-medium text-gray-900 mt-2">
          LL Request
        </h3>
      </Link>

      {/* Child Route Render Hoga */}
      <Outlet />
    </>
  );
};

export default VehicleServices;