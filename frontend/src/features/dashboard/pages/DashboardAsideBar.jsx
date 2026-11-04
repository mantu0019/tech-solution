 
import React from "react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";

import {
  LayoutDashboard,
  UserRound,
  LogOut,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const DashboardAsideBar = ({ onLogout }) => {
  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Account",
      path: "/dashboard/profile",
      icon: UserRound,
    },
    {
      title: "My Wallet",
      path: "/dashboard/wallet",
      icon: UserRound,
    },
  ];

  return (
    <aside className="w-full lg:w-[280px] shrink-0">

      <div className="bg-white border border-[#dff0ef] rounded-3xl p-5 shadow-[0_8px_30px_rgba(50,120,120,0.06)]">

        {/* Logo / Profile Section */}
        <div className="flex items-center gap-3 px-2 py-4 mb-6 border-b border-gray-100">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#55b9b5] to-[#258b91] flex items-center justify-center shadow-lg shadow-teal-100">
            <ShieldCheck size={27} className="text-white" />
          </div>

          <div>
            <h2 className="text-lg font-extrabold text-gray-800">
              Riya Cyber Cafe
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              User Dashboard
            </p>
          </div>

        </div>

        {/* Menu Heading */}
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-3">
          Main Menu
        </p>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">

          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `group relative flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#55b9b5] to-[#369fa3] text-white shadow-lg shadow-teal-100"
                      : "text-gray-600 hover:bg-[#effafa] hover:text-[#258b91]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">

                      <Icon
                        size={21}
                        strokeWidth={2}
                      />

                      <span className="font-semibold text-sm">
                        {item.title}
                      </span>

                    </div>

                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <ChevronRight size={19} />
                      </motion.div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}

        </nav>

        {/* Account Section */}
        <div className="mt-8 pt-6 border-t border-gray-100">

          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3 mb-3">
            Account
          </p>
           

          {/* Logout Button */}
          <motion.button
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.97 }}
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-300 font-semibold text-sm"
          >
            <LogOut size={21} />
            Logout
          </motion.button>

        </div>

        {/* Bottom Info */}
        <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-[#effafa] to-[#e2f5f4] border border-[#d5eeee]">

          <p className="text-sm font-bold text-[#258b91]">
            Need Help?
          </p>

          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Hum aapki digital services mein madad ke liye hamesha taiyar hain.
          </p>

        </div>

      </div>

    </aside>
  );
};

export default DashboardAsideBar;
 
