import { useSearchParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import CardGame from "../../components/CardGame";

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
            <h1 className="text-3xl text-blue-600 font-semibold mb-5">Risultati ricerca per: "<span className="font-normal px-0.5">{game}</span>" </h1>
            {loading && <p className="text-center m-5 text-lg text-blue-500">Loading...</p>}
            {error && <p className="text-center m-5 text-lg text-blue-500">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-8 md:mx-2 y-8">
                {data?.results.map((game) => (
                    <CardGame key={game.id} game={game} />
                ))}
            </div>
        </>
    )
}