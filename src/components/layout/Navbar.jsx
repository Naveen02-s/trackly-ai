import { Bell, Menu } from "lucide-react";

export default function Navbar({
  setIsSidebarOpen,
}) {
  return (
    <header className="border-b border-zinc-800 px-4 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile Menu */}
        <Menu
          size={22}
          onClick={() => setIsSidebarOpen(true)}
          className="
            lg:hidden
            text-zinc-400
            cursor-pointer
            shrink-0
          "
        />

        {/* Right Side */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Notification */}
          <Bell
            size={22}
            className="text-zinc-400 cursor-pointer shrink-0"
          />

          {/* Avatar */}
          <div
            className="
              w-10
              h-10
              rounded-full
              bg-violet-600
              shrink-0
            "
          />
        </div>
      </div>
    </header>
  );
}