import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import SidebarImages from "../../constants/SidebarImages";
import styles from "../../styles/Dashboard.module.css"

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

    return (
        <div className={styles["sidebar-wrapper"]}>
            <div className={styles["sidebar-container"]}>
                <div className={`${styles["sidebar-item"]} ${activeItem === 'dashboard' ? styles['active'] : ''}`} onClick={() => handleItemClick('dashboard')}>
                    <img src={SidebarImages.menu} className={styles["sidebar-icon"]}/>
                </div>
                {screenWidth > 750 ? 
                    <div className={`${styles["sidebar-item"]} ${activeItem === 'settings' ? styles['active'] : ''}`} onClick={() => handleItemClick('settings')}>
                        <img src={SidebarImages.settings} className={styles["sidebar-icon"]}/>
                    </div> 
                : null}
                <div className={`${styles["logout"]} ${styles["sidebar-item"]}`} onClick={() => handleItemClick('logout')}>
                    <img src={SidebarImages.logout} className={styles["sidebar-icon"]}/>
                </div>
            </div>
        </div>
    )
}