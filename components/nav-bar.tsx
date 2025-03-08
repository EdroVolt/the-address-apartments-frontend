"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  const pathname = usePathname();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-xl font-bold">
              The Address
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                href="/"
                className={`text-sm ${
                  pathname === "/"
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                Home
              </Link>
              <Link
                href="/apartments"
                className={`text-sm ${
                  pathname.startsWith("/apartments")
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                Apartments
              </Link>
              {isAdmin && (
                <Link
                  href="/admin-dashboard"
                  className={`text-sm ${
                    pathname === "/admin-dashboard"
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>
            ) : (
              <Button variant="ghost" size="sm" onClick={logout}>
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
