import React from "react";
import MainHeader from "../../components/global/MainHeader"
import Footer from "../../components/global/Footer"
import Check from "../../img/icons/green-check.png"
import styles from "../../styles/views/PaymentConfirmed.module.css"
import { useNavigate } from "react-router-dom";

export default function PaymentConfirmed() {
    
    let navigate = useNavigate()
    return (
        <>
        <main className={styles["about-main"]}>
            <MainHeader/>
            <div className={styles["payment-content"]}>
                <img src={Check} alt=""/>
                <h1>Thanks for subscribing!</h1>
                <h2>A payment to www.preptify.com will appear on your statement.</h2>
                <h2><span onClick={() => navigate("/login")}>Login</span> to your upgraded account.</h2>
            </div>
            <Footer/>
        </main>
        </>
    )
    }
