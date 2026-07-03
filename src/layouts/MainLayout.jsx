import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { motion } from "framer-motion";
import { useState } from "react";

export default function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex min-h-screen">

        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        {/* Right Side */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Navbar */}
          <Navbar setIsSidebarOpen={setIsSidebarOpen} />

          {/* Page */}
          <main className="flex-1 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </main>

        </div>

      </div>
    </div>
  );
}