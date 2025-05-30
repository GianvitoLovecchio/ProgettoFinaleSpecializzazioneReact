import { useParams } from "react-router"
import useFetch from "../../hooks/useFetch";

export default function GenrePage_index() {
    const {genre } = useParams();

    const {data, error, load } = useFetch(`https://api.rawg.io/api/games?key=25026496f67e4b888b43a18359248003&genres=${genre}&page=1`);

    return (
        <>
        <h1 className="text-5xl font-bold text-center m-4">GENERE {genre}</h1>
        </>
    )
}