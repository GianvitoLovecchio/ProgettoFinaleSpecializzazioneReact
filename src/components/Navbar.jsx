import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Menu, X } from "lucide-react"; // Installa con: npm install lucide-react
import { Link } from "react-router";
import SearchBar from "./SearchBar";
import { useProfile } from "../context/ProfileProvider";
import SessionContext from "../context/SessionContext";
import NavbarDropdown from "./NavbarDropdown";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { session } = useContext(SessionContext);
  const { profile } = useProfile();

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

          <SearchBar />

          {/* Desktop Menu */}
          {session ? (
            <div className="hidden md:flex space-x-4">
              {/* <p href="#" className="text-blue-600 font-bold text-lg hover:text-blue-600">Ciao {session.user.user_metadata.username}</p> */}
              <NavbarDropdown
                label={`Ciao ${profile?.username}`}
                items={[
                  { label: "Il mio profilo", href: "/account" },
                ]}
              >
              </NavbarDropdown>
            </div>
          ) : (
            // se non sei sutenticato
            <div className="hidden md:flex space-x-4">
              <Link to={"/register"}>
                <p href="#" className="text-blue-600 font-bold text-lg hover:text-blue-600">Registrati</p>
              </Link>
              <Link to={"/login"}>
                <p href="#" className="text-blue-600 font-bold text-lg hover:text-blue-600">Login</p>
              </Link>
            </div>
          )
          }

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
