import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router";
import supabase from "../supabase/supabase-client";
import { useNavigate } from "react-router";

export default function NavbarDropdown({ label = "Menu", items = [] }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();

    
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    alert("Logout effettuato con successo");
    navigate("/");
  }

    // Chiude il menu cliccando fuori
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            {/* Bottone del dropdown nella navbar */}
            <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center gap-1 px-3 py-2 cursor-pointer text-blue-600 font-bold text-lg hover:text-blue-600"
            >
                {label}
                <ChevronDown size={18} strokeWidth={3} className={`duration-700 text-red-700 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown menu visibile su click */}
            {open && (
                <div className="absolute right-0 mt-2 w-44 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {items.map((item, index) => (
                        <Link
                            key={index}
                            to={item.href}
                            onClick={() => setOpen(false)}
                            className="block px-4 py-2 text-sm font-semibold text-blue-600 hover:text-md hover:font-bold"
                        >
                            {item.label}
                        </Link>
                    ))}
                     <button onClick={signOut} href="#" className="px-4 py-2 cursor-pointer text-red-600 font-semibold text-lg hover:text-red-600 hover:font-bold hover:text-xl">Logout</button>
                </div>
            )}
        </div>
    );
}
