import { Bell, Search, Menu } from "lucide-react";

export default function Navbar({
  setIsSidebarOpen,
}) {
  return (
    <header className="border-b border-zinc-800 px-4 py-4">
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <Menu
          size={22}
          onClick={() => 
            setIsSidebarOpen(true)}
          className="
    lg:hidden
    text-zinc-400
    cursor-pointer
    shrink-0
  "
        />

        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <input
            type="text"
            placeholder="Search jobs..."
            className="
          w-full
          bg-zinc-900
          border
          border-zinc-800
          rounded-xl
          pl-10
          pr-4
          py-3
          text-white
          outline-none
        "
          />
        </div>

        {/* Notification */}
        <Bell size={22} className="text-zinc-400 cursor-pointer shrink-0" />

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
    </header>
  );
}
