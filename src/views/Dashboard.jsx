import DashboardContent from "../components/dashboard/DashboardContent";
import Sidebar from "../components/dashboard/Sidebar";
import "../styles/Dashboard.css";
import { Route, useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

export default function Dashboard(){

  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [])
  
  return user ? <div className="dashboard-container">
                  <Sidebar/>
                  <DashboardContent/>
                </div> : null
}