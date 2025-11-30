"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { createPayment } from "../../app/api/actions";

interface paystackprops {
  amount: number;
  email?: string;
  reference?: string;
}

const PaystackButton = (props: paystackprops) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      // Call the server action to initialize the payment
      const { reference, amount, email } = await createPayment({
        amount: props.amount,
      });
      // Initialize
      const handler = window.PaystackPop.setup({
        key: process.env.PAYSTACK_PUBLIC_KEY as string,
        email: email,
        amount: amount,
        reference: reference,
        callback: (response: any) => {
          alert("Payment successful! Reference: " + response.reference);
          router.push(`/verify-payment?reference=${response.reference}`);
        },
        onclose: () => {
          alert("Payment cancelled.");
        },
      });
      // handler.openIframe();
    } catch (error) {
      console.error("Payment initiation failed", error);
      setIsLoading(false);
      alert("Payment initialization failed");
    }
  };

  return (
    <button
      className="bg-yellow-500 font-bold capitalize tracking-wide p-2 from-orange-500 bg-gradient-to-l text-lg"
      onClick={handlePayment}
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : "buy"}
    </button>
  );
};

export default PaystackButton;
