import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { useState, useEffect, useContext } from "react";
import GridCard from "../../components/GridCard";
import TopLayout from "../../components/TopLayout";
import GlobalContext from "../../context/GlobalContext";

export default function DevPage_index() {
    const { idDev, nameDev } = useParams();
    const { sort, setSort } = useContext(GlobalContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const initialUrl = `https://api.rawg.io/api/games?key=95c63224923a4b51aa9ed6a0e37cf486&developers=${idDev}&page=${currentPage}`;
    const [allGames, setAllGames] = useState([]);
    const [cardLayout, setCardLayout] = useState(true);
    const { data, error, loading, updateUrl } = useFetch(initialUrl);

    // Resetta le variabili all'apertura della pagina, svuota allgames e imposta ad 1 la pagina
    useEffect(() => {
        const newUrl = `https://api.rawg.io/api/games?key=95c63224923a4b51aa9ed6a0e37cf486&developers=${idDev}&page=${currentPage}${sort ? `&ordering=${sort}` : ''}`
        updateUrl(newUrl);
    }, [currentPage, updateUrl, sort]);

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
                param={nameDev}
                gameCount={data?.count}
                cardLayout={cardLayout}
                setCardLayout={setCardLayout}
                title="Sviluppatore" />

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