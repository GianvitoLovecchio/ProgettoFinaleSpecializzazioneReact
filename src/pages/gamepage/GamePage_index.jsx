import { useParams } from "react-router"
import useFetch from "../../hooks/useFetch";

export default function GamePage_index() {
    const {id } = useParams();

    const {data, error, load } = useFetch(`https://api.rawg.io/api/games/${id}?key=25026496f67e4b888b43a18359248003`);

    return (
        <>
        <h1 className="text-5xl font-bold text-center m-4">GAME {id}</h1>
        </>
    )
}