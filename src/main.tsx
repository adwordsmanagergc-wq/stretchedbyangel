import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import PersonalTrainingPage from "@/react-app/pages/PersonalTraining";
import SuburbPTPage from "@/react-app/pages/SuburbPTPage";
import SuburbStretchPage from "@/react-app/pages/SuburbStretchPage";
import DisclaimerPage from "@/react-app/pages/Disclaimer";
import WaiverPage from "@/react-app/pages/Waiver";
import AreasIServicePage from "@/react-app/pages/AreasIService";
import BlogPage from "@/react-app/pages/Blog";
import PersonalTrainingBlogPage from "@/react-app/pages/PersonalTrainingBlog";
import { Analytics } from "@vercel/analytics/react";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/personal-training" element={<PersonalTrainingPage />} />
        <Route path="/personal-training/:slug" element={<SuburbPTPage />} />
        <Route path="/assisted-stretching/:slug" element={<SuburbStretchPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/waiver" element={<WaiverPage />} />
        <Route path="/areas-i-service" element={<AreasIServicePage />} />
        <Route path="/assisted-stretching-gold-coast" element={<BlogPage />} />
        <Route path="/personal-training-gold-coast" element={<PersonalTrainingBlogPage />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  </React.StrictMode>
);
