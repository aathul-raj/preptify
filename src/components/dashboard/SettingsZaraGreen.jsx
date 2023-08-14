import React from "react";
import styles from "../../styles/SettingsZaraGreen.module.css"

export default function SettingsZaraGreen({subscriptionStatus}) {

    function manageAccount() {
            // Open the billing link in new tab 
            window.open("https://billing.stripe.com/p/login/fZe4iRd9Z0ZxdPycMM", "_blank");
    }

    function pricing() {
        // Open the billing link in new tab 
        window.open("https://www.preptify.com/pricing", "_blank");
    }
    
    return (
        <div>
        {subscriptionStatus === "zara green" ? (    // Render content for subscribed users 
            <div className={styles["billing-container"]}>
                <div className={styles["billing-block-1"]}>
                    <h1>Billing</h1>
                    <h2>Manage your payment methods, subscription, and billing preferences</h2>
                </div>
                <div className={styles["billing-block-2"]}>
                    <div className={styles["plan-container"]}>
                        <h1><span className={styles["green"]}>Z</span>ARA <span className={styles["green"]}>GREEN</span></h1>
                        <button onClick={manageAccount}>Manage Account</button>
                    </div>
                </div>
            </div>
        ) : (                                       // Render content for unsubscribed users 
            <div className={styles["billing-container"]}>
                <div className={styles["billing-block-1"]}>
                    <h1>Billing</h1>
                    <h2>Manage your payment methods, subscription, and billing preferences</h2>
                </div>
                <div className={styles["billing-block-2"]}> 
                    <div className={styles["plan-container"]}>
                        <h1><span className={styles["green"]}>Z</span>ARA <span className={styles["green"]}>GREEN</span></h1>
                        <h2>Advanced features for a comprehensive and more effective interview preparation experience</h2>
                        <button onClick={pricing}>See Pricing</button>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
};


    



