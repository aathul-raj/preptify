import getStripe from "../../back-end/getStripe";

export default function StandardCheckout() {

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
            cancelUrl: 'http://localhost:5173/about',
            // ADD FUNCTIONALITY TO MAKE SURE USER IS SIGNED IN SO YOU CAN PUT customerEmail: 'customer@email.com',
        })
        console.warn(error.message);
    }
  
    return <button onClick={handleCheckout}>subscribe</button>;
  }