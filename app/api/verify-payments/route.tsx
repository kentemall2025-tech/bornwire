"use client";
import { useEffect, useState } from "react";

// Define the types for the payment status and response
interface PaymentDetails {
  id: string;
  status: string;
  amount: number;
  email: string;
  // Add any other fields from Paystack's payment response that you need
}

interface PaymentStatus {
  status: string;
  paymentDetails?: PaymentDetails;
  message?: string;
}

// Define the type for the props, in this case, `searchParams`
interface VerifyPaymentProps {
  searchParams: { reference: string };
}

// Replace this import with your actual verifyPayment function
import { verifyPayment } from "./paystackaction";

const VerifyPayment: React.FC<VerifyPaymentProps> = ({ searchParams }) => {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const verify = async () => {
      const { reference } = searchParams;
      const result = await verifyPayment(reference);
      setPaymentStatus(result);
      setLoading(false);
    };

    verify();
  }, [searchParams]);

  if (loading) return <div>Verifying payment...</div>;

  if (paymentStatus?.status === "success") {
    return (
      <div>
        Payment successful! Transaction ID: {paymentStatus.paymentDetails?.id}
      </div>
    );
  } else {
    return <div>Payment failed. Reason: {paymentStatus?.message}</div>;
  }
};

export default VerifyPayment;
