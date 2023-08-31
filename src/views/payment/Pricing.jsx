import React, { useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import MainHeader from "../../components/global/MainHeader"
import Footer from "../../components/global/Footer"
import PricingImages from "../../constants/PricingImages";
import styles from "../../styles/views/Pricing.module.css"
import StandardCheckout from "../../components/StandardCheckout";

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
    <div className={styles["main-container"]}>
      <MainHeader/>
        <div className={styles["call-text"]}>
          <h1>pricing plans</h1>
          <h2>
            Our pricing plans are designed to be affordable, flexible, and tailored to your unique needs.
          </h2>
          <img className={styles["discount"]} src={PricingImages.discount} alt="discount" ref={discountRef}/>
          <img className={styles["confetti"] + " " + styles["c-1"]} src={PricingImages.confetti} alt="confetti" />
          <img className={styles["confetti"] + " " + styles["c-2"]} src={PricingImages.confetti} alt="confetti" />
        </div>
      <div className={styles["price-switch"]} ref={priceSwitchRef}>
        <div className={`${styles["price-tile"]} ${styles["monthly"]} ${active == "monthly" ? styles["active-switch"] : styles["not-active"]}`} onClick={() => setActive("monthly")}>
          <h2>monthly</h2>
        </div>
        <div className={`${styles["price-tile"]} ${styles["yearly"]} ${active == "yearly" ? styles["active-switch"] : styles["not-active"]}`} onClick={() => setActive("yearly")}>
          <h2>yearly</h2>
        </div>
      </div>
      <div className={styles["pricing-container"]}>
        <div className={styles["basic-card"]}>
          <div className={styles["stars"]}>
            <img src={PricingImages.star} alt="star"/>
          </div>
          <div className={styles["card-heading"]}>
            <h1>Basic</h1>
            <h2>Basic mock interviews for quick practice</h2>
          </div>
          <h2 className={styles["pricing"]}>$0<span>/forever</span></h2>
          <div className={styles["line"]}></div>
          <div className={styles["features-container"]}>
            <h1>Features</h1>
            <div className={styles["feature"]}>
              <h2>Limited daily interviews</h2>
            </div>
            <div className={styles["feature"]}>
              <h2>Standard Analytics</h2>
            </div>
            <div className={styles["feature"]}>
              <h2>Interview Insights</h2>
            </div>
            <div className={styles["feature"]}>
              <h2>Ad Supported</h2>
            </div>
          </div>
          <button onClick={() => navigate('/login')}>start</button>
          <h3><a href="mailto:preptifyco@gmail.com" target="_blank">Contact Sales</a></h3>
        </div>
        <div className={styles["standard-card"]}>
        <div className={styles["stars"]}>
            <img src={PricingImages.star} alt="star"/>
            <img src={PricingImages.star} alt="star"/>
          </div>
          <div className={styles["card-heading"]}>
            <h1>Zara Green</h1>
            <h2>Additional features for detailed preparation</h2>
          </div>
          <h2 className={styles["pricing"]}>${active === "monthly" ? "14.99" : "159.99"}<span>/per {active === "monthly" ? "month" : "year" }</span></h2>
          <div className={styles["line"]}></div>
          <div className={styles["features-container"]}>
            <h1>Features</h1>
            <div className={styles["feature"]}> 
              <h2>Unlimited interviews</h2>
            </div>
            <div className={styles["feature"]}>
              <h2>Advanced Analytics</h2>
            </div>
            <div className={styles["feature"]}>
              <h2>Priority Support</h2>
            </div>
            <div className={styles["feature"]}>
              <h2>Ad-Free Experience</h2>
            </div>
          </div>
          <StandardCheckout/>
          <h3><a href="mailto:preptifyco@gmail.com" target="_blank">Contact Sales</a></h3>
        </div>
      </div>
      <Footer/>
    </div>
)
}

export default Pricing;
