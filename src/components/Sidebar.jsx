// import GenresDropdown from "./GenresDropdown";
// import { Heart } from "lucide-react";
// import { Link } from "react-router";
// import FavoritesContext from "../context/FavoritesContext"
// import { useContext } from "react";


// export default function Sidebar() {
//   const { favorites } = useContext(FavoritesContext);
//   const lunghezza = favorites?.length;

//   return (
//     <aside className="hidden md:block w-1/5 h-[calc(100vh-64px)] shadow-md overflow-y-auto sticky top-[64px] px-4 no-scrollbar">
//       <nav className="flex flex-col py-4 gap-4">
//         <Link to="/favorites" className="flex text-blue-600 font-bold my-2">
//           <Heart strokeWidth={2} className="mt-1.5 mx-2" />
//           <h2 className=" text-2xl"> Preferiti <span className="text-xl font-medium">({lunghezza})</span></h2>
//         </Link>
//         <GenresDropdown />
//       </nav>
//     </aside>
//   );
// }


import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronsRight, Heart, Gamepad2, ChevronsDown } from "lucide-react";
import FavoritesContext from "../context/FavoritesContext";
import useFetch from "../hooks/useFetch";

export default function Sidebar() {
  const { favorites } = useContext(FavoritesContext);
  const lunghezza = favorites?.length;
  const { data } = useFetch("https://api.rawg.io/api/genres?key=25026496f67e4b888b43a18359248003");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isGenresOpen, setIsGenresOpen] = useState(false); // per controllare apertura dropdown

  const handleNavigate = (path) => {
    setIsOpen(false);
    setIsGenresOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* DESKTOP */}
      <aside className="hidden md:block w-1/5 h-[calc(100vh-64px)] shadow-md overflow-y-auto sticky top-[64px] px-4 no-scrollbar">
        <nav className="flex flex-col py-4 gap-4">
          <Link to="/favorites" className="flex text-blue-600 font-bold my-2">
            <Heart strokeWidth={2} className="mt-1.5 mx-2" />
            <h2 className="text-2xl">Preferiti <span className="text-xl font-medium">({lunghezza})</span></h2>
          </Link>
          {/* Dropdown animato */}
          <details className="group rounded">
            <summary className="flex list-none cursor-pointer text-blue-600 font-bold text-2xl">
              <Gamepad2 strokeWidth={2} className="flex my-auto mx-2" />
              Generi
              <ChevronsDown
                size={22}
                strokeWidth={3}
                className="text-red-700 mt-1.5 ml-2 transition duration-500 group-open:rotate-180"
              />
            </summary>
            <ul className="py-2">
              {data?.results.map((genre) => (
                <li
                  key={genre.id}
                  className="ml-2 text-md font-semibold text-blue-600 hover:text-lg hover:font-bold py-1"
                >
                  <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
                </li>
              ))}
            </ul>
          </details>
        </nav>
      </aside>

      {/* MOBILE */}
      <div
        className="md:hidden fixed top-[64px] left-0 h-[calc(100vh-64px)] z-40 transition-all duration-500"
        style={{ width: isOpen ? '55%' : '60px', backgroundColor: isOpen? 'rgba(219,234,254,0.9' : 'rgba(0, 0, 0, 0)' }}
      >
        <div className={`bg-transparent shadow-lg h-full shadow-xl relative overflow-y-auto no-scrollbar transition-all duration-500 `}>
          {/* bottone apertura/chiusura sidebar */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={` items-center text-blue-600 'block ml-auto mr-4 mt-2'`}
          >
            <ChevronsRight
              className={`ml-2 transition-transform duration-1000 ${isOpen ? 'rotate-180' : ''}`}
              size={40}
              strokeWidth={2.5}
            />
          </button>


          <nav className={`flex flex-col items-start px-1.5 transition-all duration-300`}>
            {/* botone Preferiti */}
            <button
              onClick={() => {
                if (isOpen) handleNavigate("/favorites");
                else setIsOpen(true);
              }}
              className="flex items-center h-12 my-1 text-blue-600"
            >
              <Heart size={32} strokeWidth={2.5} className={`my-auto mx-2`}/>
              {isOpen && <span className="ml-1 text-blue-600 font-bold text-xl">Preferiti ({lunghezza})</span>}
            </button>

            {/* sezione generi */}
            {/* aperto */}
            {isOpen && (
              <details
                className="group rounded w-full"
                open={isGenresOpen}
                onClick={() => setIsGenresOpen((prev) => !prev)}
              >
                <summary className="flex list-none cursor-pointer text-blue-600 font-bold text-xl">
                  <Gamepad2 size={32} strokeWidth={2.5} className="my-auto mx-2" />
                  Generi
                  <ChevronsDown
                    size={20}
                    strokeWidth={3}
                    className="text-red-700 mt-1.5 ml-2 transition duration-500 group-open:rotate-180"
                  />
                </summary>

                <ul className="py-2 ml-4">
                  {data?.results.map((genre) => (
                    <li
                      key={genre.id}
                      className="text-md font-semibold text-blue-600 py-1"
                    >
                      <button
                        onClick={() => handleNavigate(`/games/${genre.slug}`)}
                        className="text-left w-full"
                      >
                        {genre.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            {/* Se la sidebar è chiusa: mostra solo l'icona dei generi */}
            {!isOpen && (
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center text-blue-600 mx-2 text-xl"
              >
                <Gamepad2 size={32} strokeWidth={2.5} />
              </button>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}

