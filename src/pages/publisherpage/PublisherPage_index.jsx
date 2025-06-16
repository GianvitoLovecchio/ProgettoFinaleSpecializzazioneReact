import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import GridCard from "../../components/GridCard";
import ControlPanel from "../../components/ControlPanel";
import TopLayout from "../../components/TopLayout";

export default function PublisherPage_index() {
    const { idPublisher, namePublisher } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const initialUrl = `https://api.rawg.io/api/games?key=95c63224923a4b51aa9ed6a0e37cf486&publishers=${idPublisher}&page=${currentPage}`;
    const [allGames, setAllGames] = useState([]);
    const { data, error, loading, updateUrl } = useFetch(initialUrl);
    const [cardLayout, setCardLayout] = useState(true);


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

           <TopLayout 
                param={namePublisher} 
                gameCount={data?.count} 
                title="Editore" 
                cardLayout={cardLayout} 
                setCardLayout={setCardLayout}/>
{console.log(cardLayout)}
            <GridCard
                loading={loading}
                setCurrentPage={setCurrentPage}
                isFetchingMore={isFetchingMore}
                setIsFetchingMore={setIsFetchingMore}
                gameList={allGames}
                fetchData={data}
                cardLayout={cardLayout}
            />

        </>

    );
}