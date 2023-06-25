import Bird from '../../img/bird.png'

export default function Header(){
    return <div className="header">
                <div className="welcome-text">
                    <h2>Dashboard</h2>
                    <h1>Welcome back, <span>Nico!</span></h1>
                </div>
                <img src={Bird} className="bird-logo"/>
            </div>
}