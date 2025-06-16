import { Link } from "react-router"
import ToggleFavorite from "./ToggleFavorite"
import { useContext } from "react"
import SessionContext from "../context/SessionContext"
import useFetch from "../hooks/useFetch"
import Loader from "./Loader"
import LazyLoadImageList from "./LazyLoadImageList"

export default function CardGameList({ game, preferito }) {
    const { session } = useContext(SessionContext);
    const { data, error, load } = useFetch(`https://api.rawg.io/api/games/${game.game_id}?key=95c63224923a4b51aa9ed6a0e37cf486`);
    const gameData = preferito ? data : game;

    if (preferito && !data) { return <Loader /> }

    return (
        <>
            <div className=" rounded-xl shadow-md flex flex-cols bg-blue-50 justify-between w-full md:hover:scale-105 transition duration-500">
                <div className="flex">
                    <div className="flex items-center">
                        <Link to={`/games/${gameData.slug}/${gameData.id}`} >
                            <div className="overflow-hidden rounded-l-xl">
                                <LazyLoadImageList image={gameData.background_image} />
                            </div>
                        </Link>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex flex-wrap max-w-full">
                            {gameData.genres.map((genre, index) => (
                                <Link key={index} to={`/games/${genre.name}`}>
                                    <p className="text-[11px] font-bold text-red-800 py-0.5 pr-0.5 mx-2 md:hover:scale-105 md:hover:font-extrabold" key={genre.id}>{genre.name}</p>
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