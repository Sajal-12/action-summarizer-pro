
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "py-3 bg-white/80 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-display font-semibold bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent">
            ActionSummarizer
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/#features"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            to="/#pricing"
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Pricing
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/auth?mode=login">
            <ButtonCustom variant="outline" size="default">
              Sign In
            </ButtonCustom>
          </Link>
          <Link to="/auth?mode=register">
            <ButtonCustom rightIcon>Get Started</ButtonCustom>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-fade-in">
          <div className="container py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="text-sm font-medium py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/#features"
              className="text-sm font-medium py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/#pricing"
              className="text-sm font-medium py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="flex flex-col space-y-2 pt-2 border-t border-border">
              <Link to="/auth?mode=login" onClick={() => setMobileMenuOpen(false)}>
                <ButtonCustom variant="outline" size="default" className="w-full">
                  Sign In
                </ButtonCustom>
              </Link>
              <Link to="/auth?mode=register" onClick={() => setMobileMenuOpen(false)}>
                <ButtonCustom rightIcon className="w-full">
                  Get Started
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
