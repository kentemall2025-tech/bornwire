"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface paystackprops {
  amount: number;
  email?: string;
}

const PaystackButton = (props: paystackprops) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      // Call the server API to initialize the payment
      const response = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: props.amount, // Amount in GHS or NGN
          email: props.email, // Customer's email
        }),
      });

      const { reference, amount, email } = await response.json();

      if (response.ok) {
        // Initialize Paystack payment popup
        const handler = window.PaystackPop.setup({
          key: process.env.PAYSTACK_PUBLIC_KEY as string, // Paystack public key
          email: email, // Customer's email
          amount: amount, // Amount in kobo or pesewa
          reference: reference, // Reference from server
          callback: (response: any) => {
            alert("Payment successful! Reference: " + response.reference);
            router.push(`/verify-payment?reference=${response.reference}`);
          },
          onclose: () => {
            alert("Payment cancelled.");
          },
        });

        // handler.openIframe();
      } else {
        alert("Payment initialization failed");
      }
    } catch (error) {
      console.error("Payment initialization failed", error);
      setIsLoading(false);
      alert("Error initializing payment");
    }
  };

  return (
    <button
      className="bg-yellow-500 font-bold capitalize tracking-wide p-2 from-orange-500 bg-gradient-to-l text-lg"
      onClick={handlePayment}
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : "Buy Now"}
    </button>
  );
};

export default PaystackButton;
