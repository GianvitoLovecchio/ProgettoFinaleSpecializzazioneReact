import LazyLoadGameImage from "./LazyLoadGameImage"
import { Link } from "react-router"
import ToggleFavorite from "./ToggleFavorite"
import { useContext } from "react"
import SessionContext from "../context/SessionContext"
import useFetch from "../hooks/useFetch"
import Loader from "./Loader"

export default function CardGame({ game, preferito }) {
    const { session } = useContext(SessionContext);
    const { data, error, load } = useFetch(`https://api.rawg.io/api/games/${game.game_id}?key=95c63224923a4b51aa9ed6a0e37cf486`);
    const gameData = preferito ? data : game;

    const getRatingColor = (rating) => {
        if (rating < 3) return "bg-red-800";
        if (rating < 4) return "bg-yellow-400";
        return "bg-green-800";
    };

    if (preferito && !data) { return <Loader /> }

    return (
        <>
            <div className=" rounded-xl shadow-md bg-blue-50 grid  ">
                <div className="flex items-top">
                    <LazyLoadGameImage image={gameData.background_image} />
                </div>
                <div className="p-2">
                    <div className="flex justify-between">
                        <div className="flex flex-wrap max-h-10 items-top">
                            {gameData.genres.map((genre, index) => (
                                <Link key={index} to={`/games/${genre.name}`}>
                                    <p className="text-[11px] font-bold text-red-800 py-0.5 pr-0.5 mx-2 md:hover:scale-105 md:hover:font-extrabold" key={genre.id}>{genre.name}</p>
                                </Link>
                            ))}
                        </div>
                        {
                            session && <ToggleFavorite data={gameData} size={22} />
                        }
                    </div>
                    <h1 className="my-1 mx-2  font-bold text-blue-600 text-lg">{gameData.name}</h1>

                    <div className="mx-2">
                        <span className={`font-bold text-[10px] text-white rounded-lg px-1.5 py-0.5 items-center ${getRatingColor(gameData.rating)}`}>
                            {gameData.rating == 0 ? "N/A" : gameData.rating}
                            <span className="ml-2">
                                ({gameData.reviews_count})
                            </span>
                        </span>
                    </div>
                </div>

                <div className="flex justify-end mx-4 mb-4">
                    <Link to={`/games/${gameData.slug}/${gameData.id}`}>
                        <button className="bg-red-800 border border-red-800 rounded-lg text-white mt-4 py-1 px-2 hover:scale-105 transition duration-250 hover:bg-blue-50 hover:text-black cursor-pointer">
                            Scopri
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}