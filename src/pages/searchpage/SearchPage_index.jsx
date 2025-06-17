import { useSearchParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState, useContext } from "react";
import GridCard from "../../components/GridCard";
import TopLayout from "../../components/TopLayout";
import GlobalContext from "../../context/GlobalContext";

export default function SearchPage_index() {
    let [searchParams] = useSearchParams();
    const { sort, setSort } = useContext(GlobalContext);
    const game = searchParams.get("query");
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [allGames, setAllGames] = useState([]);
    const initialUrl = `https://api.rawg.io/api/games?key=95c63224923a4b51aa9ed6a0e37cf486&search=${game}&page=${currentPage}`;
    const [cardLayout, setCardLayout] = useState(true);

    const { data, error, loading, updateUrl } = useFetch(initialUrl);

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

    useEffect(() => {
        const newUrl = `https://api.rawg.io/api/games?key=95c63224923a4b51aa9ed6a0e37cf486&search=${game}&page=${currentPage}${sort ? `&ordering=${sort}` : ''}`
        updateUrl(newUrl);
    }, [game, sort, currentPage, updateUrl]);

    return (
        <>
            <TopLayout
                param={`"${game}"`}
                gameCount={data?.count}
                cardLayout={cardLayout}
                setCardLayout={setCardLayout}
                title="Risultati ricerca per" />

            <GridCard
                loading={loading}
                setCurrentPage={setCurrentPage}
                isFetchingMore={isFetchingMore}
                setIsFetchingMore={setIsFetchingMore}
                gameList={allGames}
                fetchData={data}
                cardLayout={cardLayout} />
        </>
    )
}