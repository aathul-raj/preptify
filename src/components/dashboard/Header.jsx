import { useNavigate } from "react-router-dom";
import Bird from '../../img/bird.png'

export default function Header( {firstName} ){
    let navigate = useNavigate();
    return <div className="header">
                <div className="welcome-text">
                    <h2>Dashboard</h2>
                    <h1>Welcome back, <span>{firstName}!</span></h1>
                </div>
                <img src={Bird} onClick={() => navigate('/')} className="bird-logo"/>
            </div>
}