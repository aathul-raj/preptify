import React, { useEffect } from "react";
import { auth } from "../back-end/Firebase";
import LoginSignup from "../components/checkout/LoginSignup";
import getStripe from "../back-end/getStripe";

function Checkout() {

    useEffect(() => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            handleCheckout(user.email)
        }
    });
    }, []);

    async function handleCheckout(email){
        const stripe = await getStripe()
        const { error } = await stripe.redirectToCheckout({
            lineItems: [
                {
                    price: import.meta.env.VITE_STRIPE_PRICE_ID,
                    quantity: 1,
                }
            ],
            mode: 'subscription',
            successUrl: 'http://www.preptify.com/payment-confirmed',
            cancelUrl: 'http://www.preptify.com/pricing',
            customerEmail: email,
            allow_promotion_codes: true,
        })
        console.warn(error.message);
    }

    return <LoginSignup/>
}

export default Checkout;
