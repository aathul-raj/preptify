import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Menu from '../../img/icons/dashboard.png'
import Info from '../../img/info.png'
import Settings from '../../img/icons/settings.png'
import Logout from '../../img/icons/logout.png'

export default function Sidebar( {activeItem, setActiveItem} ){

    const navigate = useNavigate();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
        setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    const logout = async () => {
        const auth = getAuth();
        await signOut(auth);
        navigate('/');
    }

    const handleItemClick = (item) => {
        if(item !== 'logout'){
            setActiveItem(item);
        } else {
            logout();
        }
    }

    return <div className="sidebar-wrapper">
                <div className="sidebar-container">
                    <div className={`sidebar-item ${activeItem === 'dashboard' ? 'active' : ''}`} onClick={() => handleItemClick('dashboard')}>
                        <img src={Menu} className="sidebar-icon"/>
                    </div>
                    {screenWidth > 750 ? 
                        <div className={`sidebar-item ${activeItem === 'settings' ? 'active' : ''}`} onClick={() => handleItemClick('settings')}>
                            <img src={Settings} className="sidebar-icon"/>
                        </div> 
                    : null}
                    <div className="logout sidebar-item" onClick={() => handleItemClick('logout')}>
                        <img src={Logout} className="sidebar-icon"/>
                    </div>
                </div>
            </div>
}