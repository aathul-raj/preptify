import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Zara from "./views/Zara.jsx";
import Home from "./views/Home.jsx";
import Signup from "./views/Signup.jsx";
import Login from "./views/Login.jsx";
import Dashboard from "./views/Dashboard.jsx";
import LearnMore from "./views/LearnMore.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/zara" element={<Zara />} />
      </Routes>
    </Router>
  );
}
