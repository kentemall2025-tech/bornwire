"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Settings, Menu, LayoutDashboard } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { supabase } from "@/lib/supabase/supabase";
import { useEffect, useState } from "react";

export function SiteNav() {
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: Package },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  useEffect(() => {
    const handleuser = async () => {
      const { data: user } = await supabase.auth.getUser();
      setUser(user);
    };
    handleuser();
  }, []);

  return (
    <header className="border-b max-w-[20vw] object-contain">
      <div className="container flex h-10 items-center justify-between">
        <nav className="hidden md:flex gap-6">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center ease-out gap-2 text-sm transition ${
                pathname === href
                  ? "text-primary font-bold"
                  : "text-muted-foreground"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden flex gap-2 items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Menu size={20} />
            </SheetTrigger>

            <SheetContent side="left" className="w-72 pt-20">
              <div className="flex flex-col gap-6 mt-6">
                {navItems.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 text-xl mx-auto uppercase py-2 ${
                      pathname === href
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Icon size={20} />
                    {label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
