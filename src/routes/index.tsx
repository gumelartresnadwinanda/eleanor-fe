import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LandingPage from "../pages/LandingPage";
import AllMediaPage from "../pages/AllMediaPage";
import PlaylistPage from "../pages/PlaylistPage";
import TagPage from "../pages/TagPage";
import TagIndexPage from "../pages/TagIndexPage";
import FileTypePage from "../pages/FileTypePage"; // Import FileTypePage
import TagGroupedPage from "../pages/GroupedTagPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/all-media" element={<AllMediaPage />} />
          <Route path="/playlists" element={<PlaylistPage />} />
          <Route path="/tags" element={<TagIndexPage />} />
          <Route path="/tags/:tag" element={<TagPage />} />
          <Route path="/tags/:tag/group" element={<TagGroupedPage />} />
          <Route path="/file-type/:fileType" element={<FileTypePage />} /> {/* Add FileTypePage route */}
        </Route>

        {/* Redirect unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
