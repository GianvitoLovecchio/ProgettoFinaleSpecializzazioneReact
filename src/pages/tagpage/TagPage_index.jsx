import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { useState, useEffect, useContext } from "react";
import GridCard from "../../components/GridCard";
import TopLayout from "../../components/TopLayout";
import GlobalContext from "../../context/GlobalContext";


export default function TagPage_index() {
    const { tagName } = useParams();
    const { sort, setSort } = useContext(GlobalContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const initialUrl = `https://api.rawg.io/api/games?key=95c63224923a4b51aa9ed6a0e37cf486&tags=${tagName}&page=${currentPage}`;
    const [allGames, setAllGames] = useState([]);
    const { data, error, loading, updateUrl } = useFetch(initialUrl);
     const [cardLayout, setCardLayout] = useState(true);

    // Resetta le variabili all'apertura della pagina, svuota allgames e imposta ad 1 la pagina
    useEffect(() => {
        const newUrl = `https://api.rawg.io/api/games?key=95c63224923a4b51aa9ed6a0e37cf486&tags=${tagName}&page=${currentPage}${sort ? `&ordering=${sort}` : ''}`
        updateUrl(newUrl);
    }, [sort, currentPage, tagName, updateUrl]);

     useEffect(() => {
        setCurrentPage(1);
        setAllGames([]);
    }, [sort])

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
            param={`"${tagName}"`} 
            gameCount={data?.count} 
            cardLayout={cardLayout} 
            setCardLayout={setCardLayout} 
            title="Tag" />

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