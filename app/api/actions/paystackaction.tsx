// paystackaction.ts
export async function verifyPayment(reference: string): Promise<any> {
  try {
    // Make an API request to verify the payment with Paystack
    const response = await fetch(`/api/verify-payment?reference=${reference}`);
    const data = await response.json();

    if (data.status === "success") {
      return {
        status: "success",
        paymentDetails: data.paymentDetails,
      };
    } else {
      return {
        status: "failed",
        message: data.message || "Unknown error occurred",
      };
    }
  } catch (error) {
    return {
      status: "failed",
      message: error || "Error verifying payment",
    };
  }
}
