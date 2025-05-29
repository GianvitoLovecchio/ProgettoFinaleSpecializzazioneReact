import useFetch from "../hooks/useFetch";
import CardGame from "../components/CardGame";

export default function HomePage() {
    const {data, error, load } = useFetch("https://api.rawg.io/api/games?key=25026496f67e4b888b43a18359248003&dates=2024-01-01,2024-12-31&page=1");
    data?(console.log(data.results)):null;
    return (
        <>
            <div className="grid grid-cols-5 my-8">
                {data?.results.map((game) => (
                    <CardGame key={game.id} game={game}/>
                ))}
            </div>

        </>
    );
}