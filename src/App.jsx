import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Home from "./views/Home.jsx";
import Signup from "./views/Signup.jsx";
import TempSignup from "./views/TempSignup.jsx";
import Login from "./views/Login.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Interview from "./views/Interview.jsx";
import Pricing from "./views/Pricing.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<TempSignup />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/beta-user-signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview" element={<Interview />} />
      </Routes>
      <Analytics />
    </Router>
  );
}
