import useFetch from "../../hooks/useFetch";
import GridCard from "../../components/GridCard";
import { useContext, useEffect, useState } from "react";
import SessionContext from "../../context/SessionContext";
import GlobalContext from "../../context/GlobalContext";
import ControlPanel from "../../components/ControlPanel";

export default function HomePage_index() {
    const { session } = useContext(SessionContext);
    const {sort, setSort} = useContext(GlobalContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [allGames, setAllGames] = useState([]);
    const initialUrl = `https://api.rawg.io/api/games?key=b7b1b42400a549ada462bed213a5844a&page=${currentPage}`;
    const { data, error, loading, updateUrl } = useFetch(initialUrl);
    const [cardLayout, setCardLayout] = useState(true);

    useEffect(() => {
        const newUrl = `https://api.rawg.io/api/games?key=b7b1b42400a549ada462bed213a5844a&page=${currentPage}${sort ? `&ordering=${sort}` : ''}`;
        updateUrl(newUrl);
        console.log("entrato")
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