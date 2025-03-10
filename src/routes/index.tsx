import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LandingPage from "../pages/LandingPage";
import AllMediaPage from "../pages/AllMediaPage";
import PlaylistPage from "../pages/PlaylistPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/all-media" element={<AllMediaPage />} />
          <Route path="/playlists" element={<PlaylistPage />} />
        </Route>

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
