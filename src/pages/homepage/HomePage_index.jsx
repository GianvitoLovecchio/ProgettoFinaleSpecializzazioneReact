import useFetch from "../../hooks/useFetch";
import GridCard from "../../components/GridCard";
import { useContext, useEffect, useState } from "react";
import SessionContext from "../../context/SessionContext";
import ControlPanel from "../../components/ControlPanel";

export default function HomePage_index() {
    const { session } = useContext(SessionContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [allGames, setAllGames] = useState([]);
    const initialUrl = `https://api.rawg.io/api/games?key=95c63224923a4b51aa9ed6a0e37cf486&page=${currentPage}`;
    const { data, error, loading, updateUrl } = useFetch(initialUrl);
    const [cardLayout, setCardLayout] = useState(true);

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
            <ControlPanel
                cardLayout={cardLayout}
                setCardLayout={setCardLayout}
            />
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