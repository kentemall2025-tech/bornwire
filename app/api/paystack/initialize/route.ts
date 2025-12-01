// app/api/paystack/initialize/route.js

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: body.email,
          amount: body.amount,
        }),
      }
    );

    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: "Something went wrong", details: error },
      { status: 500 }
    );
  }
}
