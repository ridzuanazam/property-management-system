import {
  Home,
  Users,
  Building,
  Wrench,
  DollarSign,
  Settings,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Overview", icon: <Home size={20} />, path: "/owner/overview" },

  {
    name: "Properties",
    icon: <Building size={20} />,
    path: "/owner/properties",
  },
  { name: "Tenants", icon: <Users size={20} />, path: "/owner/tenants" },
  {
    name: "Maintenance",
    icon: <Wrench size={20} />,
    path: "/owner/maintenance",
  },
  { name: "Payments", icon: <DollarSign size={20} />, path: "/owner/payments" },
  { name: "Settings", icon: <Settings size={20} />, path: "/owner/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={` h-screen bg-gray-900 text-gray-100 flex flex-col transition-all duration-300 ${
        collapsed ? "w-20 items-center" : "w-50"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h1
          className={`font-bold text-xl ml-4 ${collapsed ? "hidden" : "block"}`}
        >
          Property
        </h1>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded hover:bg-amber-100 bg-amber-300"
        >
          {collapsed ? (
            <Menu size={20} color="#000000" />
          ) : (
            <ChevronLeft size={20} color="#000000" />
          )}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5  py-5 text-sm hover:bg-gray-800  ease-in-out 
            ${isActive ? "bg-gray-800 text-blue-400" : "text-gray-300"}
            ${collapsed ? " rounded-2xl my-3" : "py-8 pl-8"}`
            }
          >
            <div
              className={
                collapsed
                  ? "hover:scale-110 transform transition-all duration-200 ease-out"
                  : ""
              }
            >
              {item.icon}
            </div>

            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
