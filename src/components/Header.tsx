import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="bg-gradient-orange text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <GraduationCap className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">Unified School Admission Portal</h1>
              <p className="text-sm opacity-90">Ximhungwe Circuit Schools</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`hover:bg-white/10 px-3 py-2 rounded-md transition-colors ${
                isActive('/') ? 'bg-white/20' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/schools" 
              className={`hover:bg-white/10 px-3 py-2 rounded-md transition-colors ${
                isActive('/schools') ? 'bg-white/20' : ''
              }`}
            >
              Schools
            </Link>
            <Link 
              to="/admin-login" 
              className={`hover:bg-white/10 px-3 py-2 rounded-md transition-colors ${
                isActive('/admin-login') ? 'bg-white/20' : ''
              }`}
            >
              Admin
            </Link>
            <Link 
              to="/contact" 
              className={`hover:bg-white/10 px-3 py-2 rounded-md transition-colors ${
                isActive('/contact') ? 'bg-white/20' : ''
              }`}
            >
              Contact
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className={`hover:bg-white/10 px-3 py-2 rounded-md transition-colors ${
                  isActive('/') ? 'bg-white/20' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/schools" 
                className={`hover:bg-white/10 px-3 py-2 rounded-md transition-colors ${
                  isActive('/schools') ? 'bg-white/20' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Schools
              </Link>
              <Link 
                to="/admin-login" 
                className={`hover:bg-white/10 px-3 py-2 rounded-md transition-colors ${
                  isActive('/admin-login') ? 'bg-white/20' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
              <Link 
                to="/contact" 
                className={`hover:bg-white/10 px-3 py-2 rounded-md transition-colors ${
                  isActive('/contact') ? 'bg-white/20' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};