import { Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import HomePage from "./pages/HomePage.jsx";
import RequestPage from "./pages/RequestPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { XeroxPage } from "./pages/XeroxPage.jsx";
import { ProfilePage } from "./pages/ProfilePage.jsx";

import Navbar from "./components/Navbar.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

import { useUserStore } from "./stores/useUserStore.js";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  useEffect(() => {
    console.log("app:", user);
    checkAuth();
  }, [checkAuth]);
  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      <Navbar className="mb-20" />
      <Routes>
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
      </Routes>
    </div>
  );
}

export default App;
