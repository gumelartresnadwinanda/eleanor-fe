import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

const MainLayout = lazy(() => import("../layouts/MainLayout"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const AllMediaPage = lazy(() => import("../pages/AllMediaPage"));
const PlaylistPage = lazy(() => import("../pages/PlaylistPage"));
const TagPage = lazy(() => import("../pages/TagPage"));
const TagIndexPage = lazy(() => import("../pages/TagIndexPage"));
const FileTypePage = lazy(() => import("../pages/FileTypePage"));
const TagGroupedPage = lazy(() => import("../pages/GroupedTagPage"));

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<MainLayout />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/all-media" element={<AllMediaPage />} />
            <Route path="/playlists" element={<PlaylistPage />} />
            <Route path="/tags" element={<TagIndexPage />} />
            <Route path="/tags/:tag" element={<TagPage />} />
            <Route path="/tags/:tag/group" element={<TagGroupedPage />} />
            <Route path="/file-type/:fileType" element={<FileTypePage />} />
          </Route>

          {/* Redirect unknown paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
