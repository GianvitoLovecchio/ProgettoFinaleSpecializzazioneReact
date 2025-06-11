import useFetch from "../../hooks/useFetch";
import { useEffect, useContext, useState } from "react";
import SessionContext from "../../context/SessionContext";
import GridCard from "../../components/GridCard";
import SortPanel from "../../components/SortPanel";
import  GlobalContext  from "../../context/GlobalContext";



export default function HomePage_index() {
    const { url, currentPage, setCurrentPage } = useContext(GlobalContext);
    const { session } = useContext(SessionContext);
    const { data, error, loading } = useFetch(url);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [allGames, setAllGames] = useState([]);

    // Resetta la variabile all'apertura della pagina, svuota allgames
    useEffect(() => {
        setAllGames([]);
    }, [url])

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
            <SortPanel/>

            <GridCard
                loading={loading}
                setCurrentPage={setCurrentPage}
                isFetchingMore={isFetchingMore}
                setIsFetchingMore={setIsFetchingMore}
                gameList={allGames}
                fetchData={data} />
        </>
    );
}