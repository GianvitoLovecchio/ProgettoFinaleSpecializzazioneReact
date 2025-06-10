import { useSearchParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import CardGame from "../../components/CardGame";
import Loader from "../../components/Loader";

export default function SearchPage_index() {
    let [searchParams] = useSearchParams();
    const game = searchParams.get("query");

    const initialUrl = `https://api.rawg.io/api/games?key=25026496f67e4b888b43a18359248003&search=${game}`;

    const { data, error, loading, updateUrl } = useFetch(initialUrl);

    useEffect(() => {
        updateUrl(initialUrl);
    }, [initialUrl, updateUrl]);

    return (
        <>
            <h1 className="text-3xl text-blue-600 font-semibold mb-1">Risultati ricerca per: "<span className="font-normal px-0.5">{game}</span>" </h1>
            <p className="text-md text-blue-600 font-norlmal mb-5">Giochi trovati: <span className="font-semibold">{data?.count}</span> </p>
            {loading && <Loader />}
            {error && <p className="text-center m-5 text-lg text-blue-600">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4 md:mx-2 y-8">
                {data?.results.map((game) => (
                    <CardGame key={game.id} game={game} />
                ))}
            </div>
        </>
    )
}