import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import CardGame from "../../components/CardGame";
import Loader from "../../components/Loader";

export default function TagPage_index() {
    const { tagName } = useParams();
    const { data, error, loading } = useFetch(`https://api.rawg.io/api/games?key=25026496f67e4b888b43a18359248003&tags=${tagName}`);
    return (
         <>
                    <h1 className="text-3xl text-blue-600 font-semibold mb-1">Tag: <span className="font-normal px-0.5">"{tagName}"</span> </h1>
                    <p className="text-md text-blue-600 font-norlmal mb-5">Giochi trovati: <span className="font-semiblod">{data?.count}</span> </p>
                    {loading && <Loader />}
                    {error && <p className="text-center m-5 text-lg text-blue-600">{error}</p>}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4 md:mx-2 y-8">
                        {data?.results.map((game) => (
                            <CardGame key={game.id} game={game} />
                        ))}
                    </div>
                </>
    );
}