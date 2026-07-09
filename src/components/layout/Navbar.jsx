import { Bell, Menu, Search } from "lucide-react";

export default function Navbar({ setIsSidebarOpen }) {
  return (
    <header
      className="
        sticky top-0 z-30
        h-20
        border-b
        border-zinc-200
        dark:border-white/5
        bg-white/80
        dark:bg-black/80
        backdrop-blur-md
        transition-colors
      "
    >
      <div className="h-full px-6 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="
              lg:hidden
              p-2
              rounded-lg
              hover:bg-zinc-100
              dark:hover:bg-white/5
              transition
            "
          >
            <Menu
              size={22}
              className="text-zinc-600 dark:text-zinc-400"
            />
          </button>

          {/* Search */}
          <div
            className="
              hidden
              md:flex
              items-center
              gap-3
              w-80
              px-4
              py-2.5
              rounded-xl
              bg-zinc-100
              dark:bg-zinc-900
              border
              border-zinc-200
              dark:border-white/5
              transition-colors
            "
          >
            <Search
              size={18}
              className="text-zinc-500 dark:text-zinc-500"
            />

            <input
              type="text"
              placeholder="Search..."
              className="
                w-full
                bg-transparent
                outline-none
                text-sm
                text-zinc-900
                dark:text-white
                placeholder:text-zinc-500
                dark:placeholder:text-zinc-500
              "
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">

          {/* Notification */}
          <button
            className="
              relative
              p-2
              rounded-xl
              hover:bg-zinc-100
              dark:hover:bg-white/5
              transition
            "
          >
            <Bell
              size={21}
              className="text-zinc-600 dark:text-zinc-400"
            />

            <span
              className="
                absolute
                top-2
                right-2
                w-2
                h-2
                rounded-full
                bg-violet-500
              "
            />
          </button>

          {/* Avatar */}
          <div
            className="
              w-10
              h-10
              rounded-full
              bg-gradient-to-br
              from-violet-500
              to-fuchsia-600
              flex
              items-center
              justify-center
              font-semibold
              text-sm
              text-white
              shadow-lg
            "
          >
            N
          </div>

        </div>

      </div>
    </header>
  );
}