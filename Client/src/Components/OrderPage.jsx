import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "./StripeForm";
import Info from "./Info";

const stripePromise = loadStripe(
  "pk_test_51PMTgdKUWb34gm8GPlvZck6IGHPpZpf4j5v63uZVBxU3uitlt38C8n1AphOeBnbfGCOkiND2UOWNLCqbtAaBRGzC00SRb45omP"
);

const OrderPage = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const handlePaymentSubmit = async (paymentMethodId, amount, currency) => {
    try {
      const response = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentMethodId, amount, currency }),
      });

      const paymentResponse = await response.json();
      return paymentResponse;
    } catch (error) {
      console.error("Payment error:", error);
      return { success: false };
    }
  };

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
  };

  const handleOrderSubmit = () => {
    setOrderSubmitted(true);
  };

  return (
    <div>
      <Elements stripe={stripePromise}>
        <StripeForm
          handlePaymentSubmit={handlePaymentSubmit}
          onPaymentSuccess={handlePaymentSuccess}
          amount={50} // or the amount you want to pass
        />
      </Elements>
      <Info
        paymentSuccess={paymentSuccess}
        orderSubmitted={orderSubmitted}
        onOrderSubmit={handleOrderSubmit}
      />
    </div>
  );
};

export default OrderPage;
