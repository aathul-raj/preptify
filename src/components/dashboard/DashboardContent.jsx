import Header from './Header'
import Start from './Start'
import Analytics from './Analytics'

export default function DashboardContent(){
    return <div className="dashboard-content">
        <Header/>
        <div className="content-container">
            <Start/>
            <Analytics/>
        </div>
    </div>
}