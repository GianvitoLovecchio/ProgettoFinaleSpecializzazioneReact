import { Link } from "react-router"
import ToggleFavorite from "./ToggleFavorite"
import { useContext } from "react"
import SessionContext from "../context/SessionContext"
import useFetch from "../hooks/useFetch"
import Loader from "./Loader"
import LazyLoadImageList from "./LazyLoadImageList"

export default function CardGameList({ game, preferito }) {
    const { session } = useContext(SessionContext);
    const { data, error, load } = useFetch(`https://api.rawg.io/api/games/${game.game_id}?key=b7b1b42400a549ada462bed213a5844a`);
    const gameData = preferito ? data : game;

    if (preferito && !data) { return <Loader /> }

    return (
        <>
            <div className=" rounded-xl shadow-md flex flex-cols bg-blue-50 justify-between w-full md:hover:scale-105 transition duration-500">
                <div className="flex">
                    <div className="flex items-center h-17">
                        <Link to={`/games/${gameData.slug}/${gameData.id}`} >
                            <div className="overflow-hidden rounded-l-xl">
                                <LazyLoadImageList image={gameData.background_image} />
                            </div>
                        </Link>
                    </div>

                    {/* sezione tittolo e genrei da mobile */}
                    <div className="md:hidden flex flex-col">
                        <div className="flex flex-wrap max-w-full ml-2">
                            {gameData.genres.map((genre, index) => (
                                index < 2 ?
                                    (<Link key={index} to={`/games/${genre.slug}`}>
                                        <span className="md:text-[11px] text-[9px] font-bold text-red-800 py-0.5 pr-0.5 md:mx-2 md:hover:scale-105 md:hover:font-extrabold" key={genre.id}>{genre.name}</span>
                                    </Link>) : null
                            ))}
                            {gameData.genres.length > 2 && <span className="flex items-center pt-1.5 md:text-[11px] text-[9px] font-bold text-red-800 ">, +{gameData.genres.length - 2}</span>}
                        </div>
                        <Link to={`/games/${gameData.slug}/${gameData.id}`} >
                            <h1 className=" ml-4 font-bold text-blue-600 text-[11px] md:text-xl md:hover:underline">{gameData.name}</h1>
                        </Link>
                    </div>

                    {/* sezione tittolo e genrei da desktop */}
                    <div className="hidden md:flex md:flex-col">
                        <div className="flex flex-wrap max-w-full">
                            {gameData.genres.map((genre, index) => (
                                <Link key={index} to={`/games/${genre.slug}`}>
                                    <p className="text-[11px] font-bold text-red-800 py-0.5 pr-0.5 md:mx-2 md:hover:scale-105 md:hover:font-extrabold" key={genre.id}>{genre.name}</p>
                                </Link>
                            ))}
                        </div>
                        <Link to={`/games/${gameData.slug}/${gameData.id}`} >
                            <h1 className=" ml-4 font-bold text-blue-600 text-[14px] md:text-xl md:hover:underline">{gameData.name}</h1>
                        </Link>
                    </div>
                </div>

                {
                    session && <div className="block mx-4 my-auto"><ToggleFavorite data={gameData} size={30} /></div>
                }

            </div>

        </>
    )
}