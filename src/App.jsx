import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Kanban from "./pages/Kanban";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/applications" element={<Applications />} />

          <Route path="/kanban" element={<Kanban />} />

          <Route path="/settings" element={<Settings />} />

        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
