import {
  X,
  LayoutDashboard,
  Briefcase,
  KanbanSquare,
  Settings,
  FileText,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Sidebar({ isOpen, setIsOpen }) {
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/",
    },
    {
      icon: Briefcase,
      label: "Applications",
      path: "/applications",
    },
   
    {
      icon: KanbanSquare,
      label: "Kanban",
      path: "/kanban",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
    },
  ];

  return (
  <>
    {isOpen && (
      <div
        onClick={() => setIsOpen(false)}
        className="
          fixed
          inset-0
          bg-black/50
          z-40
          lg:hidden
        "
      />
    )}

    <aside
      className={`
        fixed
        top-0
        left-0
        h-full
        w-64
        bg-zinc-950
        border-r
        border-zinc-800
        p-6
        z-50
        transition-transform
        duration-300
        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
        lg:translate-x-0
        lg:static
      `}
    >
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold text-violet-500">Trackly AI</h1>

          <p className="text-zinc-500 text-sm mt-1">Job Tracker</p>
        </div>

        <X
          size={22}
          onClick={() => setIsOpen(false)}
          className="
      lg:hidden
      cursor-pointer
      text-zinc-400
    "
        />
      </div>

      <div className="space-y-2">
        {menuItems.map((item) => (
          <motion.div key={item.label} whileHover={{ x: 4 }}>
            <NavLink
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `
          flex
          items-center
          gap-3
          px-4
          py-3
          rounded-xl
          transition-all

          ${
            isActive
              ? "bg-violet-600 text-white"
              : "text-zinc-400 hover:bg-zinc-900"
          }
        `
              }
            >
              <item.icon size={20} />

              {item.label}
            </NavLink>
          </motion.div>
        ))}
      </div>
    </aside>
    </>
  );
}
