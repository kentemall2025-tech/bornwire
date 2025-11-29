import axios from "axios";

const PAYSTACK_SECRET_KEY = "your-secret-key"; // Replace with your Paystack secret key

export async function createPayment({ amount }: { amount: number }) {
  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: "customer@example.com", // Replace with customer email
        amount: amount, // Amount in kobo (5000 = 50 NGN)
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { data } = response;

    if (data.status === "success") {
      return {
        reference: data.data.reference,
        amount: amount,
        email: "customer@example.com", // Customer email to send to frontend
      };
    } else {
      throw new Error("Error initializing payment");
    }
  } catch (error) {
    throw new Error("Payment initialization failed: " + error);
  }
}
