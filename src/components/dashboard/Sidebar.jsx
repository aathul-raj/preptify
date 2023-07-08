import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Menu from '../../img/icons/dashboard.png'
import Basket from '../../img/icons/basket.png'
import Info from '../../img/info.png'
import Settings from '../../img/icons/settings.png'
import Logout from '../../img/icons/logout.png'

export default function Sidebar(){

    const navigate = useNavigate();

    const logout = async () => {
        const auth = getAuth();
        await signOut(auth);
        navigate('/');
    }

    return <div className="sidebar-wrapper">
        <div className="sidebar-container">
            <div className="sidebar-item">
                <img src={Menu} className="sidebar-icon"/>
            </div>
            <div className="sidebar-item">
                <img src={Basket} className="sidebar-icon"/>
            </div>
            <div className="sidebar-item">
                <img src={Info} className="sidebar-icon"/>
            </div>
            <div className="sidebar-item">
                <img src={Settings} className="sidebar-icon"/>
            </div>
            <div className="logout sidebar-item" onClick={logout}>
                <img src={Logout} className="sidebar-icon"/>
            </div>
        </div>
    </div>
}