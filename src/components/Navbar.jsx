import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Menu, X } from "lucide-react"; // Installa con: npm install lucide-react
import { Link } from "react-router";
import SearchBar from "./SearchBar";
import { useProfile } from "../context/ProfileProvider";
import SessionContext from "../context/SessionContext";
import NavbarDropdown from "./NavbarDropdown";
import supabase from "../supabase/supabase-client";
import { set } from "zod/v4";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { session, logout } = useContext(SessionContext);
  const { profile, avatarImgUrl } = useProfile();
  const { setProfile, setAvatarImgUrl } = useProfile();



  const handleLogout = async () => {
    await supabase.auth.signOut(); // chiama supabase
    logout(); // centralizzato: fa tutto (modale, pulizia sessione)
    setProfile(null);
    setAvatarImgUrl(null);
    setIsOpen(false); // chiudi il mobile menu se aperto
    navigate("/"); // vai alla home
  };


  return (
    <nav className="sticky top-0 left-0 bg-blue-100 w-full z-50">
      <div className="pl-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link to="/">
            <div className="flex-shrink-0 ">
              <span className="text-2xl md:text-4xl font-bold text-blue-600">react</span><span className="text-2xl md:text-4xl font-extrabold text-red-600">GAME</span>
            </div>
          </Link>

          <SearchBar />

          {/* Desktop Menu */}
          {session ? (
            <div className="hidden md:flex space-x-1 items-center">
              {avatarImgUrl && (
                <img
                  src={avatarImgUrl}
                  alt="Avatar"
                  className=" w-8 h-8 rounded-full object-cover"
                />
              )}
              <NavbarDropdown
                label={`Ciao ${profile?.username}`}
                items={[
                  { label: "Il mio profilo", href: "/account" },
                ]}
              />
            </div>
          ) : (
            // se non sei autenticato
            <div className="hidden md:flex space-x-4">
              <Link to={"/register"} className="text-blue-600 font-bold text-lg hover:text-blue-600">
                Registrati
              </Link>
              <Link to={"/login"} className="text-blue-600 font-bold text-lg hover:text-blue-600">
                Login
              </Link>
            </div>
          )}

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Chiudi menu" : "Apri menu"}
              className="text-blue-600 font-bold focus:outline-none my-2"
            >
              {isOpen ? (
                <X strokeWidth={2.25} className="w-12 h-8" />
              ) : (
                <Menu strokeWidth={2.25} className="w-12 h-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-100 shadow-lg px-4 py-2 space-y-2">
          {!session ? (
            <>
              <div className="flex justify-evenly">
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center text-lg  font-bold text-center text-blue-600"
                >
                  Registrati
                </Link>
                <div className="border-r-3 h-9 text-blue-600"></div>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center text-lg  font-bold text-center text-blue-600"
                >
                  Login
                </Link>
              </div>

            </>
          ) : (
            <>
              <span className="block text-blue-600 font-semibold">Ciao {profile?.username}</span>
              <div className="flex justify-evenly">
                <Link
                  to="/account"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center text-blue-600 text-lg font-bold"
                >
                  Il mio profilo
                </Link>
                 <div className="border-r-3 h-9 text-blue-600"></div>
                <button onClick={handleLogout} href="#" className="flex items-center font-bold text-lg text-red-600">Logout</button>
              </div>

            </>
          )}
        </div>
      )}

    </nav>
  );
}
