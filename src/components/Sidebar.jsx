import GenresDropdown from "./GenresDropdown";
import { Heart } from "lucide-react";
import { Link } from "react-router";
import FavoritesContext from "../context/FavoritesContext"
import { useContext } from "react";


export default function Sidebar() {
  const { favorites } = useContext(FavoritesContext);
  const lunghezza = favorites?.length;

  return (
    <aside className="hidden md:block w-1/5 h-[calc(100vh-64px)] shadow-md overflow-y-auto sticky top-[64px] px-4 no-scrollbar">
      <nav className="flex flex-col py-4 gap-4">
        <Link to="/favorites" className="flex text-blue-600 font-bold my-2">
          <Heart strokeWidth={2} className="mt-1.5 mx-2" />
          <h2 className=" text-2xl"> Preferiti <span className="text-xl font-medium">({lunghezza})</span></h2>
        </Link>
        <GenresDropdown />
      </nav>
    </aside>
  );
}
