import React, { useState, useEffect, useRef} from "react";
import "../styles/pricing.css";
import Logo from "../img/preptify_cropped.png";
import { Link, useNavigate } from "react-router-dom";
import PricingImages from "../constants/PricingImages";

function Pricing() {
  const navigate = useNavigate();
  const [active, setActive] = useState("monthly")
  const priceSwitchRef = useRef(null);
  const discountRef = useRef(null);

  useEffect(() => {
    // Get the bounding rectangles of the two elements
    const priceSwitchRect = priceSwitchRef.current.getBoundingClientRect();
  
    // Calculate the vertical center of the price-switch container
    const priceSwitchCenter = priceSwitchRect.top + priceSwitchRect.height / 2;
  
    // Apply the calculated top position to the confetti image
    discountRef.current.style.position = 'absolute';
    discountRef.current.style.top = `${priceSwitchCenter}px`;
  }, []);

  return (
    <div className="main-container">
      <div className="header">
        <div className="logo-container">
          <Link to="/">
            <img className="logo-img" src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="auth-buttons-container">
          <button onClick={() => navigate("/login")} className="log-in-button">
            log in
          </button>
        </div>
      </div>
        <div className="call-text">
          <h1>pricing plans</h1>
          <h2>
            Our pricing plans are designed to be affordable, flexible, and tailored to your unique needs.
          </h2>
          <img className="discount" src={PricingImages.discount} alt="discount" ref={discountRef}/>
          <img className="confetti c-1" src={PricingImages.confetti} alt="confetti" />
          <img className="confetti c-2" src={PricingImages.confetti} alt="confetti" />
        </div>
      <div className="price-switch" ref={priceSwitchRef}>
        <div className={`price-tile monthly ${active == "monthly" ? "active-switch" : "not-active"}`} onClick={() => setActive("monthly")}>
          <h2>monthly</h2>
        </div>
        <div className={`price-tile yearly ${active == "yearly" ? "active-switch" : "not-active"}`} onClick={() => setActive("yearly")}>
          <h2>yearly</h2>
        </div>
      </div>
      <div className="pricing-container">
        <div className="basic-card">
          <div className="stars">
            <img src={PricingImages.star} alt="star"/>
          </div>
          <div className="card-heading">
            <h1>Basic</h1>
            <h2>Basic mock interviews for quick practice</h2>
          </div>
          <h2 className="pricing">$0<span>/forever</span></h2>
          <div className="line"></div>
          <div className="features-container">
            <h1>Features</h1>
            <div className="feature">
              <img src={PricingImages.check} alt="check"/>
              <h2>Limited daily interviews</h2>
            </div>
            <div className="feature">
            <img src={PricingImages.check} alt="check"/>
              <h2>Standard Analytics</h2>
            </div>
            <div className="feature">
              <img src={PricingImages.check} alt="check"/>
              <h2>Interview Insights</h2>
            </div>
            <div className="feature">
              <img src={PricingImages.check} alt="check"/>
              <h2>Ad Supported</h2>
            </div>
          </div>
          <button onClick={() => navigate('/signup')}>start</button>
          <h3><a href="mailto:preptifyco@gmail.com" target="_blank">Contact Sales</a></h3>
        </div>
        <div className="standard-card">
        <div className="stars">
            <img src={PricingImages.star} alt="star"/>
            <img src={PricingImages.star} alt="star"/>
          </div>
          <div className="card-heading">
            <h1>Standard</h1>
            <h2>Additional features for detailed preparation</h2>
          </div>
          <h2 className="pricing">${active === "monthly" ? "9.99" : "189.99"}<span>/per {active === "monthly" ? "month" : "year"}</span></h2>
          <div className="line"></div>
          <div className="features-container">
            <h1>Features</h1>
            <div className="feature"> 
              <img src={PricingImages.check} alt="check"/>
              <h2>Unlimited interviews</h2>
            </div>
            <div className="feature">
              <img src={PricingImages.check} alt="check"/>
              <h2>Advanced Analytics</h2>
            </div>
            <div className="feature">
              <img src={PricingImages.check} alt="check"/>
              <h2>Priority Support</h2>
            </div>
            <div className="feature">
              <img src={PricingImages.check} alt="check"/>
              <h2>Ad-Free Experience</h2>
            </div>
          </div>
          <button>coming soon</button>
          <h3><a href="mailto:preptifyco@gmail.com" target="_blank">Contact Sales</a></h3>
        </div>
      </div>
      <div className="footer">
          <button> people </button>
          <button> faq </button>
          <button> contact </button>
        </div>
    </div>
  );
}

export default Pricing;
