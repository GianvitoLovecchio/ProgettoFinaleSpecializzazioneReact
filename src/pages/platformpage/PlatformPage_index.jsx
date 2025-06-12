import { useParams } from "react-router"
import { useEffect } from "react"
import useFetch from "../../hooks/useFetch"
import PlatformsArray from "../../components/PlatformsArray"
import CardGame from "../../components/CardGame"
import Loader from "../../components/Loader"



export default function PlatformPage_index() {
    const { id } = useParams();
    const { data, loading, error, updateUrl } = useFetch();

    useEffect(() => {
        updateUrl(`https://api.rawg.io/api/games?key=95c63224923a4b51aa9ed6a0e37cf486&platforms=${id}`);
    }, [id]);

    const myPLatform = PlatformsArray.find((p) => p.id === Number(id));


    return (
        <>
            <div className="flex">
                <h1 className="md:text-3xl text-xl text-blue-600 font-normal mb-5">Giochi per:
                    <span className="font-semibold pl-3">{myPLatform.name}</span>
                </h1>
                <img src={myPLatform.image} alt="" className="bg-white rounded-full mx-2 md:h-9 md:w-9 w-7 h-7 mx-4" />
            </div>
            {loading && <Loader />}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4 md:mx-2 y-8">
                {data?.results.map((game) => (
                    <CardGame key={game.id} game={game} />
                ))}

            </div>
        </>
    )
}