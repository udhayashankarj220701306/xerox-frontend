import { Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage.jsx";
import RequestPage from "./pages/RequestPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { XeroxPage } from "./pages/XeroxPage.jsx";
import { ProfilePage } from "./pages/ProfilePage.jsx";

import Navbar from "./components/Navbar.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

import { useUserStore } from "./stores/useUserStore.js";
import { TermsAndCondition } from "./pages/TermsAndCondition.jsx";
import { PrivacyPolicy } from "./pages/PrivacyPolicy.jsx";
import { RefundPolicy } from "./pages/RefundPolicy.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  useEffect(() => {
    console.log("app:", user);
    checkAuth();
  }, [checkAuth]);
  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      <div>
        <Toaster />
      </div>
      <Navbar className="mb-20" />
      <Routes className="py-12 mt-6 sm:px-6 lg:px-8 min-h-1vh">
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <Navigate to="/login" />}
        />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        <Route
          path="/request"
          element={user ? <RequestPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/xerox"
          element={user ? <XeroxPage /> : <Navigate to="/login" />}
        />
        <Route path="/termsandcondition" element={<TermsAndCondition />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/refundpolicy" element={<RefundPolicy />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
