import { useSearchParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import GridCard from "../../components/GridCard";

export default function SearchPage_index() {
    let [searchParams] = useSearchParams();
    const game = searchParams.get("query");
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [allGames, setAllGames] = useState([]);
    const initialUrl = `https://api.rawg.io/api/games?key=25026496f67e4b888b43a18359248003&search=${game}&page=${currentPage}`;

    const { data, error, loading, updateUrl } = useFetch(initialUrl);

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

    useEffect(() => {
        updateUrl(initialUrl);
    }, [initialUrl, updateUrl]);

    return (
        <>
            <h1 className="text-3xl text-blue-600 font-semibold mb-1">Risultati ricerca per: "<span className="font-normal px-0.5">{game}</span>" </h1>
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