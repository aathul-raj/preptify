import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Zara from "./views/Zara.jsx";
import Home from "./views/Home.jsx";
import Signup from "./views/Signup.jsx";
import Login from "./views/Login.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/zara" element={<Zara />} />
      </Routes>
    </Router>
  );
}