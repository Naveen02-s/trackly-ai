import {
  LayoutDashboard,
  Briefcase,
  Kanban,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen }) {
  const linkClass = ({ isActive }) =>
    `
    flex items-center gap-3
    px-4 py-3
    rounded-xl
    text-sm
    font-medium
    transition-all duration-200

    ${
      isActive
        ? "bg-violet-500/10 text-violet-600 dark:text-violet-300 border border-violet-500/20"
        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white"
    }
  `;

  return (
    <>
      {/* Mobile Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64
          bg-white
          dark:bg-black
          border-r
          border-zinc-200
          dark:border-white/5
          transition-transform duration-300

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:hidden
        `}
      >
        {/* Logo */}
        <div
          className="
            h-20
            border-b
            border-zinc-200
            dark:border-white/5
            flex
            items-center
            px-6
          "
        >
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              <span className="text-zinc-900 dark:text-white">
                Trackly
              </span>

              <span className="text-violet-500">
                AI
              </span>
            </h1>

            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              Job Tracker
            </p>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <NavLink
            to="/"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/applications"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            <Briefcase size={18} />
            Applications
          </NavLink>

          <NavLink
            to="/kanban"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            <Kanban size={18} />
            Kanban & Analytics
          </NavLink>

          <NavLink
            to="/settings"
            className={linkClass}
            onClick={() => setIsOpen(false)}
          >
            <Settings size={18} />
            Settings
          </NavLink>
        </nav>
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className="
          hidden
          lg:flex
          lg:flex-col
          w-64
          shrink-0
          bg-white
          dark:bg-black
          border-r
          border-zinc-200
          dark:border-white/5
          transition-colors
        "
      >
        {/* Logo */}
        <div
          className="
            h-20
            border-b
            border-zinc-200
            dark:border-white/5
            flex
            items-center
            px-6
          "
        >
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              <span className="text-zinc-900 dark:text-white">
                Trackly
              </span>

              <span className="text-violet-500">
                AI
              </span>
            </h1>

            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              Job Tracker
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/" className={linkClass}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/applications"
            className={linkClass}
          >
            <Briefcase size={18} />
            Applications
          </NavLink>

          <NavLink
            to="/kanban"
            className={linkClass}
          >
            <Kanban size={18} />
            Kanban & Analytics
          </NavLink>

          <NavLink
            to="/settings"
            className={linkClass}
          >
            <Settings size={18} />
            Settings
          </NavLink>
        </nav>
      </aside>
    </>
  );
}