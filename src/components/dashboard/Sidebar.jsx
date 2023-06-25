import Menu from '../../img/icons/dashboard.png'
import Basket from '../../img/icons/basket.png'
import Info from '../../img/icons/info.png'
import Settings from '../../img/icons/settings.png'

export default function Sidebar(){
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
        </div>
    </div>
}