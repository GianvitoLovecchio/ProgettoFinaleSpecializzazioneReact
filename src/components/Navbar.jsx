import { useState } from "react";
import { Menu, X, Search } from "lucide-react"; // Installa con: npm install lucide-react
import { Link } from "react-router";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 bg-blue-100 w-full z-50">
      <div className="pl-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <Link to="/">
          <div className="flex-shrink-0 ">
            <span className="text-4xl font-bold text-blue-600">react</span><span className="text-4xl font-extrabold text-red-600">GAME</span>
          </div>
          </Link>

          <SearchBar/>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <a href="#" className="text-blue-600 font-bold text-lg hover:text-blue-600">Home</a>
            <a href="#" className="text-blue-600 font-bold text-lg hover:text-blue-600">About</a>
            <a href="#" className="text-blue-600 font-bold text-lg hover:text-blue-600">Contact</a>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-blue-600 font-bold focus:outline-none m-2"
            >
              {isOpen ? <X strokeWidth={2.25} className="w-12 h-8" /> : <Menu strokeWidth={2.25} className="w-12 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-2 space-y-2">
          <a href="#" className="block text-blue-600 hover:text-blue-600">Home</a>
          <a href="#" className="block text-blue-600 hover:text-blue-600">About</a>
          <a href="#" className="block text-blue-600 hover:text-blue-600">Contact</a>
        </div>
      )}
    </nav>
  );
}
