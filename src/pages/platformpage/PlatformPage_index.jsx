import { useParams } from "react-router"
import useFetch from "../../hooks/useFetch"
import PlatformsArray from "../../components/PlatformsArray"
import CardGame from "../../components/CardGame"
import Loader from "../../components/Loader"



export default function PlatformPage_index() {
    const { id } = useParams();
    const { data, loading, error } = useFetch(`https://api.rawg.io/api/games?key=25026496f67e4b888b43a18359248003&platforms=${id}`);

    const myPLatform = PlatformsArray.find((p) => p.id === Number(id));


    return (
        <>
            <div className="flex">
                <h1 className="text-3xl text-blue-600 font-normal mb-5">Giochi per:
                    <span className="font-semibold  pl-3">{myPLatform.name}</span>
                </h1>
                <img src={myPLatform.image} alt="" className="bg-white rounded-full p-1 mx-2 h-9 w-9 mx-4" />
            </div>
            {loading && <Loader />}
            {error && <p className="text-center m-5 text-lg text-blue-500">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4 md:mx-2 y-8">
                {data?.results.map((game) => (
                    <CardGame key={game.id} game={game} />
                ))}

            </div>
        </>
    )
}