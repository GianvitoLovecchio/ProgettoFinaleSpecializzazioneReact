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
            <div className=" rounded-xl shadow-md bg-blue-50 grid md:hover:scale-110 transition duration-500 pb-6">
                {console.log(gameData)}
                <Link to={`/games/${gameData.slug}/${gameData.id}`}>
                    <div className="flex items-top">
                        <LazyLoadGameImage image={gameData.background_image} />
                    </div>
                </Link>
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

                    <div className="mx-2 my-2 flex justify-between">
                        <div className={`font-bold text-[10px] text-white rounded-lg px-1.5 pt-0.5 items-center ${getRatingColor(gameData.rating)}`}>
                            {gameData.rating == 0 ? "N/A" : gameData.rating}
                            <span className="ml-2">
                                ({gameData.reviews_count})
                            </span>
                        </div>
                        <h5 className="text-blue-500 font-semibold text-[12px] flex items-center">
                            Metacritic: <span className="ml-1 font-bold text-[14px]">{gameData.metacritic}</span>
                        </h5>
                    </div>
                </div>

                {/* <div className="flex justify-end mx-4 mb-4"> */}

                {/* <button className="bg-red-800 border border-red-800 rounded-lg text-white mt-4 py-1 px-2 hover:scale-105 transition duration-250 hover:bg-blue-50 hover:text-black cursor-pointer">
                            Scopri
                        </button> */}
                {/* </div> */}
            </div>

        </>
    )
}