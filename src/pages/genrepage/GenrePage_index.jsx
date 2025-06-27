import { useParams } from "react-router"
import { useEffect, useState, useContext } from "react"
import useFetch from "../../hooks/useFetch";
import GridCard from "../../components/GridCard";
import TopLayout from "../../components/TopLayout";
import GlobalContext from "../../context/GlobalContext";


export default function GenrePage_index() {
    const { genre } = useParams();
    const { sort, setSort } = useContext(GlobalContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [allGames, setAllGames] = useState([]);
    const initialUrl = `https://api.rawg.io/api/games?key=b7b1b42400a549ada462bed213a5844a&genres=${genre}&page=${currentPage}`;
    const [cardLayout, setCardLayout] = useState(true);

    const { data, error, loading, updateUrl } = useFetch(initialUrl);

    useEffect(() => {
        const newUrl = `https://api.rawg.io/api/games?key=b7b1b42400a549ada462bed213a5844a&genres=${genre}&page=${currentPage}${sort ? `&ordering=${sort}` : ''}`
        updateUrl(newUrl);
    }, [genre, sort, updateUrl, currentPage]);

    //quando cambia il genere resetta la pagina, l'array dei giochi e il valore della sort
    useEffect(() => {
        setCurrentPage(1);
        setAllGames([]);
        setSort('');
    }, [ genre]) 


    //al variare di sort resetta la pagina, l'array dei giochi
    useEffect(() => {
        setCurrentPage(1);
        setAllGames([]);
    }, [ sort])

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
            <TopLayout
                param={formatString(genre)}
                gameCount={data?.count}
                cardLayout={cardLayout}
                setCardLayout={setCardLayout}
                title="Genere" />

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