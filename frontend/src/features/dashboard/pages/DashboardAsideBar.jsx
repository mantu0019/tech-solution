import React from "react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";

import {
  LayoutDashboard,
  UserRound,
  Wallet,
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
      icon: Wallet,
    },
  ];

  return (
    <aside className="w-full lg:w-[260px] xl:w-[280px] shrink-0">

      <div className="bg-white border border-[#d5eeee] rounded-2xl p-3 sm:p-4 lg:p-5 lg:sticky lg:top-6">

        {/* Logo */}
        <div className="flex items-center gap-3 px-2 py-3 lg:py-4 lg:mb-6 lg:border-b border-[#edf3f3]">

          <div className="w-10 h-10 lg:w-12 lg:h-12 shrink-0 rounded-xl bg-[#e5f5f4] flex items-center justify-center text-[#369fa3]">
            <ShieldCheck size={25} />
          </div>

          <div className="min-w-0">
            <h2 className="text-base lg:text-lg font-semibold text-gray-800 truncate">
              Riya Cyber Cafe
            </h2>

            <p className="text-xs text-gray-500 mt-0.5">
              User Dashboard
            </p>
          </div>

        </div>

        {/* Menu Heading */}
        <p className="hidden lg:block text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">
          Main Menu
        </p>

        {/* Navigation */}
        <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `group flex shrink-0 lg:w-full items-center justify-between gap-2 px-3 sm:px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-[#e5f5f4] text-[#258b91]"
                      : "text-gray-600 hover:bg-[#f4fafa] hover:text-[#258b91]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-2.5">

                      <Icon size={19} />

                      <span className="whitespace-nowrap">
                        {item.title}
                      </span>

                    </div>

                    {isActive && (
                      <ChevronRight
                        size={17}
                        className="hidden lg:block"
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}

        </nav>

        {/* Account Section */}
        <div className="hidden lg:block mt-7 pt-5 border-t border-[#edf3f3]">

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">
            Account
          </p>

          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={19} />
            Logout
          </button>

        </div>

        {/* Help Section */}
        <div className="hidden lg:block mt-6 p-4 rounded-xl bg-[#effafa] border border-[#d5eeee]">

          <p className="text-sm font-semibold text-[#258b91]">
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