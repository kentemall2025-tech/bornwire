import { NextResponse } from "next/server";
import axios from "axios";

// Your Paystack secret key (should be stored in environment variables)
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(req: Request) {
  const { amount, email } = await req.json();

  if (!amount || !email) {
    return NextResponse.json(
      { message: "Amount and email are required" },
      { status: 400 }
    );
  }

  try {
    // Make a request to Paystack to initialize the payment
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        amount: amount * 100, // Convert amount to kobo (1 GHS = 100 Pesewa, 1 NGN = 100 Kobo)
        email: email,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`, // Use your secret key
        },
      }
    );

    const { data } = response;

    if (data.status === "success") {
      // Return the payment reference and amount
      return NextResponse.json({
        reference: data.data.reference,
        amount: data.data.amount,
        email: email,
      });
    } else {
      return NextResponse.json(
        { message: "Payment initialization failed" },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error("Error initializing payment:", error);
    return NextResponse.json(
      { message: "Error initializing payment" },
      { status: 500 }
    );
  }
}
