import React, { useEffect } from "react";
import { auth } from "../back-end/Firebase";
import LoginSignup from "../components/checkout/LoginSignup";
import getStripe from "../back-end/getStripe";

function Checkout() {

    useEffect(() => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            handleCheckout()
        }
    });
    }, []);

    async function handleCheckout(){
        const stripe = await getStripe()
        const { error } = await stripe.redirectToCheckout({
            lineItems: [
                {
                    price: import.meta.env.VITE_STRIPE_PRICE_ID,
                    quantity: 1,
                }
            ],
            mode: 'subscription',
            successUrl: 'http://localhost:5173/payment-confirmed',
            cancelUrl: 'http://localhost:5173/pricing',
            // ADD FUNCTIONALITY TO MAKE SURE USER IS SIGNED IN SO YOU CAN PUT customerEmail: 'customer@email.com',
        })
        console.warn(error.message);
    }

    return <LoginSignup/>
}

export default Checkout;
