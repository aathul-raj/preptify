import { useNavigate } from "react-router-dom";
import DashboardImages from "../../constants/DashboardImages";

export default function Header( {firstName} ){
    let navigate = useNavigate();
    return <div className="header">
                <div className="welcome-text">
                    <h2>Dashboard</h2>
                    <h1>Welcome back, <span>{firstName}!</span></h1>
                </div>
                <img src={DashboardImages.bird} alt="Logo" onClick={() => navigate('/')} className="bird-logo"/>
            </div>
}