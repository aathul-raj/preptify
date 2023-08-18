import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Home from "./views/Home.jsx";
import Signup from "./views/Signup.jsx";
import TempSignup from "./views/TempSignup.jsx";
import Login from "./views/Login.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Resume from "./views/Resume.jsx";
import Interview from "./views/Interview.jsx";
import Pricing from "./views/Pricing.jsx";
import About from "./views/About.jsx";
import Terms from "./views/Terms.jsx";
import PaymentConfirmed from "./views/PaymentConfirmed.jsx"
import Checkout from "./views/Checkout.jsx";
import Admin from "./views/Admin.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

export default function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<TempSignup />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/beta-user-signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/payment-confirmed" element={<PaymentConfirmed/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
        <Analytics />
      </Router>
    </AuthContextProvider>
  );
}
