import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { motion } from "framer-motion";
import { useState } from "react";



export default function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div
      className="
    min-h-screen
    flex
    bg-black
    text-white
  "
    >
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 lg:ml-64 flex flex-col">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />

        <main className="flex-1 overflow-auto">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
