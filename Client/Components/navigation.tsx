import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Microchip, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const { isAuthenticated, isLoading } = useAuth();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Microchip className="text-primary text-2xl mr-3" />
              <span className="text-xl font-bold text-primary">FixMyIoT</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`text-gray-600 hover:text-primary transition-colors ${location === '/' ? 'text-primary font-medium' : ''}`}>
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link href="/dashboard" className={`text-gray-600 hover:text-primary transition-colors ${location === '/dashboard' ? 'text-primary font-medium' : ''}`}>
                  Dashboard
                </Link>
                <Link href="/queries" className={`text-gray-600 hover:text-primary transition-colors ${location === '/queries' ? 'text-primary font-medium' : ''}`}>
                  Past Queries
                </Link>
              </>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <Button onClick={handleLogout} variant="ghost" className="text-primary hover:text-primary-dark">
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleLogin} variant="ghost" className="text-primary hover:text-primary-dark">
                      Login
                    </Button>
                    <Button onClick={handleLogin} className="bg-secondary text-white hover:bg-secondary/90">
                      Sign Up
                    </Button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              <Link href="/" className={`block px-3 py-2 text-gray-600 hover:text-primary transition-colors ${location === '/' ? 'text-primary font-medium' : ''}`}>
                Home
              </Link>
              {isAuthenticated && (
                <>
                  <Link href="/dashboard" className={`block px-3 py-2 text-gray-600 hover:text-primary transition-colors ${location === '/dashboard' ? 'text-primary font-medium' : ''}`}>
                    Dashboard
                  </Link>
                  <Link href="/queries" className={`block px-3 py-2 text-gray-600 hover:text-primary transition-colors ${location === '/queries' ? 'text-primary font-medium' : ''}`}>
                    Past Queries
                  </Link>
                </>
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              {!isLoading && (
                <>
                  {isAuthenticated ? (
                    <Button onClick={handleLogout} variant="ghost" className="w-full text-left justify-start text-primary hover:text-primary-dark">
                      Logout
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button onClick={handleLogin} variant="ghost" className="w-full text-left justify-start text-primary hover:text-primary-dark">
                        Login
                      </Button>
                      <Button onClick={handleLogin} className="w-full bg-secondary text-white hover:bg-secondary/90">
                        Sign Up
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
