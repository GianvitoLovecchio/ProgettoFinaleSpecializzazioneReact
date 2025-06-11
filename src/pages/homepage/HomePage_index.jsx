import useFetch from "../../hooks/useFetch";
import CardGame from "../../components/CardGame";
import { useEffect, useContext, useState } from "react";
import SessionContext from "../../context/SessionContext";
import { PuffLoader } from "react-spinners";

export default function HomePage_index() {
    const { session } = useContext(SessionContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [allGames, setAllGames] = useState([]);

    const { data, error, loading } = useFetch(`https://api.rawg.io/api/games?key=25026496f67e4b888b43a18359248003&dates=2024-01-01,2024-12-31&page=${currentPage}`);

    useEffect(() => {
        setCurrentPage(1);
        setAllGames([]);
    }, [])

    useEffect(() => {
        if (data?.results) {
            setAllGames(prevGames => [...prevGames, ...data.results]);
        }
    }, [data]);


    return (
        <>
            {/* {!loading ? (
                <> */}
            <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 mx-4 md:mx-2">
                {allGames.map((game) => (
                    <CardGame key={game.id} game={game} />
                ))}
            </div>
            <div className="flex flex-col items-center my-8 gap-2">
                {loading ?
                    <div className="flex justify-center items-center">
                        <PuffLoader size={60} speedMultiplier={2} />
                    </div> 
                    :
                    <button
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Carica più giochi
                    </button>
                }
            </div>
            {/* </>
            ) : (
                <Loader />
            )} */}
        </>
    );
}