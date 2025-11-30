import NavBar from "@/components/ui/navbar";

export default function RotLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar />
      {children}
      <script
        src="https://js.paystack.co/v1/inline.js"
        integrity="sha384-r5X1CkmSPeQppdtdWxRfJYwVjUduZjYkHxfbs5f6Y9LOd+6y1Qgb/tsd3d6dRLUJ"
        crossOrigin="anonymous"
      ></script>
    </div>
  );
}
