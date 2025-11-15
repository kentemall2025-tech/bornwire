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
    </div>
  );
}
