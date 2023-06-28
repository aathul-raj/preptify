import DashboardContent from "../components/dashboard/DashboardContent";
import Sidebar from "../components/dashboard/Sidebar";
import { getAuth } from "firebase/auth";
import "../styles/Dashboard.css";

export default function Dashboard(){
  return <div className="dashboard-container">
    <Sidebar/>
    <DashboardContent/>
  </div>
}