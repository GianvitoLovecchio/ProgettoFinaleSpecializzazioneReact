import { useParams } from "react-router"
import { useEffect } from "react"
import useFetch from "../../hooks/useFetch";
import CardGame from "../../components/CardGame";
import Loader from "../../components/Loader";

export default function GenrePage_index() {
    const { genre } = useParams();

    const initialUrl = `https://api.rawg.io/api/games?key=25026496f67e4b888b43a18359248003&genres=${genre}`;

    const { data, error, loading, updateUrl } = useFetch(initialUrl);

    useEffect(() => {
        updateUrl(initialUrl);
    }, [initialUrl, updateUrl]);


    return (
        <>
            <h1 className="text-3xl text-blue-600 font-semibold mb-5">Genere: <span className="font-normal px-0.5">{genre}</span> </h1>
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