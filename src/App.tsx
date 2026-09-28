import { Routes, Route, Navigate } from "react-router";
import HomePage from "@/react-app/pages/Home";
import PersonalTrainingPage from "@/react-app/pages/PersonalTraining";
import SuburbPTPage from "@/react-app/pages/SuburbPTPage";
import SuburbStretchPage from "@/react-app/pages/SuburbStretchPage";
import DisclaimerPage from "@/react-app/pages/Disclaimer";
import WaiverPage from "@/react-app/pages/Waiver";
import AreasIServicePage from "@/react-app/pages/AreasIService";
import BlogPage from "@/react-app/pages/Blog";
import NotFoundPage from "@/react-app/pages/NotFound";

/** Route table shared by the browser app and the build-time prerender. */
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Server-side these are 301s in vercel.json; these cover client-side navigation. */}
      <Route path="/personal-training" element={<Navigate to="/personal-training-gold-coast" replace />} />
      <Route path="/assisted-stretching" element={<Navigate to="/" replace />} />
      <Route path="/assisted-stretching-gold-coast" element={<Navigate to="/pnf-stretching" replace />} />
      <Route path="/personal-training/:slug" element={<SuburbPTPage />} />
      <Route path="/assisted-stretching/:slug" element={<SuburbStretchPage />} />
      <Route path="/disclaimer" element={<DisclaimerPage />} />
      <Route path="/waiver" element={<WaiverPage />} />
      <Route path="/areas-i-service" element={<AreasIServicePage />} />
      <Route path="/pnf-stretching" element={<BlogPage />} />
      <Route path="/personal-training-gold-coast" element={<PersonalTrainingPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
