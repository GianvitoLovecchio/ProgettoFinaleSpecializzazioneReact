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

    function formatString(str) {
        // Sostituisce i trattini con gli spazi
        let result = str.replace(/-/g, ' ');
        // Rende maiuscola la prima lettera e lascia il resto invariato
        result = result.charAt(0).toUpperCase() + result.slice(1);
        return result;
    }

    // Esempio d'uso:
    console.log(formatString("ciao-come-va")); // Output: "Ciao come va"


    return (
        <>
            <h1 className="text-3xl text-blue-600 font-semibold mb-1">Genere: <span className="font-normal px-0.5">{formatString(genre)}</span> </h1>
            <p className="text-md text-blue-600 font-norlmal mb-5">Giochi trovati: <span className="font-semibold">{data?.count}</span> </p>
            {loading && <Loader />}
            {console.log(data)}
            {error && <p className="text-center m-5 text-lg text-blue-600">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4 md:mx-2 y-8">
                {data?.results.map((game) => (
                    <CardGame key={game.id} game={game} />
                ))}
            </div>
        </>
    )
}