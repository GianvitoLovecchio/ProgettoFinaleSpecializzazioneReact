import { useParams } from "react-router"
import { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch";
import GridCard from "../../components/GridCard";

export default function GenrePage_index() {
    const { genre } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [allGames, setAllGames] = useState([]);
    const initialUrl = `https://api.rawg.io/api/games?key=95c63224923a4b51aa9ed6a0e37cf486&genres=${genre}&page=${currentPage}`;

    const { data, error, loading, updateUrl } = useFetch(initialUrl);

    useEffect(() => {
        updateUrl(initialUrl);
    }, [initialUrl, updateUrl]);

    useEffect(() => {
        setCurrentPage(1);
        setAllGames([]);
    }, [])

    // Aggiunge i giochi alla lista
    useEffect(() => {
        if (data?.results) {
            setAllGames(prevGames => [...prevGames, ...data.results]);
        }
    }, [data]);

    // Gestisce il caricamento di più giochi
    useEffect(() => {
        if (!loading && isFetchingMore) {
            setIsFetchingMore(false);
        }
    }, [loading]);

    function formatString(str) {
        // Sostituisce i trattini con gli spazi
        let result = str.replace(/-/g, ' ');
        // Rende maiuscola la prima lettera e lascia il resto invariato
        result = result.charAt(0).toUpperCase() + result.slice(1);
        return result;
    }
    
    return (
        <>
            <h1 className="text-3xl text-blue-600 font-semibold mb-1">Genere: <span className="font-normal px-0.5">{formatString(genre)}</span> </h1>
            <p className="text-md text-blue-600 font-norlmal mb-5">Giochi trovati: <span className="font-semibold">{data?.count}</span> </p>
            <GridCard
                loading={loading}
                setCurrentPage={setCurrentPage}
                isFetchingMore={isFetchingMore}
                setIsFetchingMore={setIsFetchingMore}
                gameList={allGames}
                fetchData={data} />
        </>
    )
}