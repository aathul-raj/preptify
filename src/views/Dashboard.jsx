import "../styles/dashboard.css";
import Logo from "../img/preptify_cropped.png";

function Dashboard() {
  return (
    <div className="main-container">
      {/* <div className="header">
        <div className="logo-container">
          <Link to="/">
            <img className="logo-img" src={Logo} alt="logo" />
          </Link>
        </div>
      </div> */}
      <h1>this gon be the dash</h1>
      <div className="footer">
        <button> people </button>
        <button> faq </button>
        <button> contact </button>
      </div>
    </div>
  );
}

export default Dashboard;
