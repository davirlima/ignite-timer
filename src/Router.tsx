import { Routes, Route, Navigate } from "react-router-dom";
import { DeafultLayout } from "./pages/layouts/DefaultLayout";
import { History } from "./pages/History";
import { Home } from "./pages/Home";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DeafultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
