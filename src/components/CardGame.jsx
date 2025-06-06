import LazyLoadGameImage from "./LazyLoadGameImage"
import { Link } from "react-router"
import ToggleFavorite from "./ToggleFavorite"
import { useContext } from "react"
import SessionContext from "../context/SessionContext"
import useFetch from "../hooks/useFetch"
import Loader from "./Loader"

export default function CardGame({ game, preferito }) {
    const { session } = useContext(SessionContext);
    const { data, error, load } = useFetch(`https://api.rawg.io/api/games/${game.game_id}?key=25026496f67e4b888b43a18359248003`);
    const gameData = preferito ? data : game;

     if (preferito && !data) { return <Loader /> }

    return (
        <>
            <div className="m-2 p-4 rounded-xl shadow-md bg-blue-50 grid justify-between ">
                <div className="flex justify-between">
                    <h1 className="font-semibold">{gameData.name}</h1>
                    {
                        session && <ToggleFavorite data={gameData} size={22} />
                    }
                </div>
                <div className="flex flex-wrap h-10 items-center">
                    {gameData.genres.map((genre, index) => (
                        <Link key={index} to={`/games/${genre.slug}`}>
                            <p className="h-5 text-[10px] font-semibold border border-red-700 rounded-lg bg-red-700 text-white py-0.5 px-2 mx-1" key={genre.id}>{genre.name}</p>
                        </Link>
                    ))}
                </div>
                <div className="flex items-center">
                    <LazyLoadGameImage image={gameData.background_image} />
                </div>
                <div className="flex justify-end">
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