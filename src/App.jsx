import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Kanban from "./pages/Kanban";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/applications" element={<Applications />} />

          <Route path="/kanban" element={<Kanban />} />

          <Route path="/analytics" element={<Analytics />} />

          <Route path="/settings" element={<Settings />} />

          <Route path="/kanban" element={<Kanban />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
