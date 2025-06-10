import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronsRight, Heart, Gamepad2, ChevronsDown, Joystick } from "lucide-react";
import FavoritesContext from "../context/FavoritesContext";
import useFetch from "../hooks/useFetch";
import platformArray from "./PlatformsArray";

export default function Sidebar() {
  const { favorites } = useContext(FavoritesContext);
  const lunghezza = favorites?.length;
  const { data } = useFetch("https://api.rawg.io/api/genres?key=25026496f67e4b888b43a18359248003");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const [isPlatformsOpen, setIsPlatformsOpen] = useState(false); // stato per piattaforme mobile

  const handleNavigate = (path) => {
    setIsOpen(false);
    setIsGenresOpen(false);
    setIsPlatformsOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* DESKTOP */}
      <aside className="hidden md:block w-1/5 h-[calc(100vh-64px)] shadow-md overflow-y-auto sticky top-[64px] pl-2 pr-4 no-scrollbar">
        <nav className="flex flex-col py-4 gap-4">
          {/* bottone preferiti */}
          <Link to="/favorites" className="flex text-blue-600 font-bold my-1">
            <Heart strokeWidth={2} size={22} className="mt-1.5 mx-2" />
            <h2 className="text-2xl">Preferiti <span className="text-xl font-medium">({lunghezza})</span></h2>
          </Link>

          {/* BOttone generi */}
          <details className="group rounded">
            <summary className="flex list-none cursor-pointer text-blue-600 font-bold text-2xl my-1">
              <Gamepad2 strokeWidth={2} size={22} className="flex my-auto mx-2" />
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
                  className="flex ml-2 text-md font-semibold text-blue-600 hover:scale-103 hover:font-extrabold py-1"
                >
                  <img src={genre.image_background} alt="" className="rounded-full mx-2 h-7 w-7 " />
                  <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
                </li>
              ))}
            </ul>
          </details>
          {/* bottone piattaforme */}
          <details className="group rounded">
            <summary className="flex list-none cursor-pointer text-blue-600 font-bold text-2xl my-1">
              <Joystick strokeWidth={2} size={22} className="flex my-auto mx-2" />
              Piattaforme
              <ChevronsDown
                size={22}
                strokeWidth={3}
                className="text-red-700 mt-1.5 ml-2 transition duration-500 group-open:rotate-180"
              />
            </summary>
            <ul className="py-2">
              {platformArray.map((p) => (
                <li
                  key={p.id}
                  className="flex ml-2 text-md font-semibold text-blue-600 hover:scale-103 hover:font-extrabold py-1"
                >
                  <img src={p.image} alt="" className="bg-white rounded-full p-1 mx-2 h-8 w-8 " />
                  <Link to={`/platform/${p.id}`}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </details>
        </nav>
      </aside>

      {/* MOBILE */}
      <div
        className="md:hidden fixed top-[64px] left-0 h-[calc(100vh-64px)] z-40 transition-all duration-500"
        style={{ width: isOpen ? '55%' : '60px', backgroundColor: isOpen ? 'rgba(219,234,254,0.9)' : 'rgba(0, 0, 0, 0)' }}
      >
        <div className="bg-transparent shadow-lg h-full shadow-xl relative overflow-y-auto no-scrollbar transition-all duration-500">
          {/* bottone apertura/chiusura sidebar */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="items-center text-red-600 block ml-auto mr-4 mt-2"
          >
            <ChevronsRight
              className={`ml-2 transition-transform duration-1000 ${isOpen ? 'rotate-180' : ''}`}
              size={40}
              strokeWidth={2.5}
            />
          </button>

          <nav className="flex flex-col items-start px-1.5 transition-all duration-300">
            {/* Preferiti */}
            <button
              onClick={() => {
                if (isOpen) handleNavigate("/favorites");
                else setIsOpen(true);
              }}
              className="flex items-center h-12 my-2 text-blue-600"
            >
              <Heart size={32} strokeWidth={2.5} className="my-auto mx-2" />
              {isOpen && <span className="ml-1 text-blue-600 font-bold text-xl">Preferiti ({lunghezza})</span>}
            </button>

            {/* Generi */}
            {/* bottone generi aperto */}
            {isOpen && (
              <details
                className="group rounded w-full"
                open={isGenresOpen}
                onClick={() => setIsGenresOpen((prev) => !prev)}
              >
                <summary className="flex list-none cursor-pointer text-blue-600 font-bold text-xl">
                  <Gamepad2 size={32} strokeWidth={2.5} className="my-2 mx-2" />
                  Generi
                  <ChevronsDown
                    size={20}
                    strokeWidth={3}
                    className="text-red-700 mt-1.5 ml-2 transition duration-500 group-open:rotate-180"
                  />
                </summary>
                <ul className="py-2 ml-4">
                  {data?.results.map((genre) => (
                    <li key={genre.id} className="text-md font-semibold text-blue-600 py-1">
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

            {/* bottone generi chiuso */}
            {!isOpen && (
              <button
                onClick={() => setIsOpen(true)}
                className="flex my-2 text-blue-600 mx-2 text-xl"
              >
                <Gamepad2 size={32} strokeWidth={2.5} />
              </button>
            )}

            {/* Piattaforme */}
            {/* bottone piattaforme aperto */}
            {isOpen && (
              <details
                className="group rounded w-full"
                open={isPlatformsOpen}
                onClick={() => setIsPlatformsOpen((prev) => !prev)}
              >
                <summary className="flex list-none cursor-pointer text-blue-600 font-bold text-xl my-2">
                  <Joystick size={32} strokeWidth={2.5} className="my-auto mx-2" />
                  Piattaforme
                  <ChevronsDown
                    size={20}
                    strokeWidth={3}
                    className="text-red-700 mt-1.5 ml-2 transition duration-500 group-open:rotate-180"
                  />
                </summary>
                <ul className="py-2 ml-4">
                  {platformArray.map((p) => (
                    <li key={p.id} className="text-md font-semibold text-blue-600 py-1 flex items-center">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="bg-white rounded-full p-1 mx-2 h-6 w-6"
                      />
                      <button
                        onClick={() => handleNavigate(`/platform/${p.id}`)}
                        className="text-left w-full"
                      >
                        {p.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            {/* bottone piattaforme chiuso */}  
            {!isOpen && (
              <button
                onClick={() => setIsOpen(true)}
                className="flex text-blue-600 mx-2 text-xl my-2"
              >
                <Joystick size={32} strokeWidth={2.5} />
              </button>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}