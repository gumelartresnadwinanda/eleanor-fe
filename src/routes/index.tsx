import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

const MainLayout = lazy(() => import("../layouts/MainLayout"));
const LandingPage = lazy(() => import("../pages/LandingPage"));
const AllMediaPage = lazy(() => import("../pages/AllMediaPage"));
const TagIndexPage = lazy(() => import("../pages/TagIndexPage"));
const FileTypePage = lazy(() => import("../pages/FileTypePage"));
const TagGroupedPage = lazy(() => import("../pages/GroupedTagPage"));
const FootballPage = lazy(() => import("../pages/Football"));
// TODO: add dedicated profile page to set up the config for the user
const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<MainLayout />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/all-media" element={<AllMediaPage />} />
            <Route path="/tags" element={<TagIndexPage />} />
            <Route path="/tags/:type" element={<TagIndexPage />} />
            <Route path="/tags/:tag/group" element={<TagGroupedPage />} />
            <Route path="/file-type/:fileType" element={<FileTypePage />} />
            <Route path="/bola/:team" element={<FootballPage />} />
          </Route>

          {/* Redirect unknown paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
