import LazyLoadGameImage from "./LazyLoadGameImage"
import { Link } from "react-router"

export default function CardGame({ game }) {
    return (
        <>
            <div className="m-2 p-4 rounded-xl shadow-md bg-blue-50 grid justify-between ">
                <h1 className="font-semibold">{game.name}</h1>
                <div className="flex flex-wrap h-10 items-center">
                    {game.genres.map((genre) => (
                        // console.log(genre.name)
                        <Link to={`/games/${genre.slug}`}>
                            <p className="h-5 text-[10px] font-semibold border border-red-700 rounded-lg bg-red-700 text-white py-0.5 px-2 mx-1" key={genre.id}>{genre.name}</p>
                        </Link>
                    ))}
                </div>
                <div className="flex items-center">
                    <LazyLoadGameImage image={game.background_image} />
                </div>
                <div className="flex justify-end">
                    <Link to={`/games/${game.slug}/${game.id}`}>
                        <button className="bg-red-800 border border-red-800 rounded-lg text-white mt-4 py-1 px-2 hover:scale-105 transition duration-250 hover:bg-blue-50 hover:text-black cursor-pointer">
                            Scopri
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}