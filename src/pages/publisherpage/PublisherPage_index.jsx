import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import GridCard from "../../components/GridCard";

export default function PublisherPage_index() {
    const { idPublisher, namePublisher } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const initialUrl = `https://api.rawg.io/api/games?key=95c63224923a4b51aa9ed6a0e37cf486&publishers=${idPublisher}&page=${currentPage}`;
    const [allGames, setAllGames] = useState([]);
    const { data, error, loading, updateUrl } = useFetch(initialUrl);
    console.log("Publisher ID:", idPublisher);


    // Resetta le variabili all'apertura della pagina, svuota allgames e imposta ad 1 la pagina
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

    return (
        <>
        
            <h1 className="text-3xl text-blue-600 font-semibold mb-1">
                Editore: <span className="font-normal px-0.5"></span>
                {namePublisher}
            </h1>
            <p className="text-md text-blue-600 font-normal mb-5">
                Giochi trovati: <span className="font-semibold">{data?.count}</span>
            </p>

            <GridCard
                loading={loading}
                setCurrentPage={setCurrentPage}
                isFetchingMore={isFetchingMore}
                setIsFetchingMore={setIsFetchingMore}
                gameList={allGames}
                fetchData={data}
            />

        </>

    );
}