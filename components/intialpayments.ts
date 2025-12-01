interface funcprops {
  amount: number;
  email: string;
}

async function initializePayment(props: funcprops) {
  const res = await fetch("/api/paystack/initialize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: props.email,
      amount: props.amount,
    }),
  });

  const data = await res.json();
  console.log(data);

  if (data?.data?.authorization_url) {
    window.location.href = data.data.authorization_url;
  }
}
