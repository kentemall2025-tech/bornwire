// pages/api/create-payment.ts
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ message: "Amount is required" });
  }

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        amount: amount * 100,
        email: "user@example.com",
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const { data } = response;

    if (data.status === "success") {
      return res.status(200).json({
        reference: data.data.reference,
        amount: data.data.amount,
        email: "user@example.com",
      });
    } else {
      return res.status(400).json({
        message: "Payment initialization failed",
      });
    }
  } catch (error) {
    console.error("Error initializing payment:", error);
    return res.status(500).json({
      message: "Error initializing payment",
    });
  }
}
