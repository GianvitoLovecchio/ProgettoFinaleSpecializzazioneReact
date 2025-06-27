import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { useState, useEffect, useContext } from "react";
import GridCard from "../../components/GridCard";
import TopLayout from "../../components/TopLayout";
import GlobalContext from "../../context/GlobalContext";

export default function PublisherPage_index() {
    const { idPublisher, namePublisher } = useParams();
    const { sort, setSort } = useContext(GlobalContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const initialUrl = `https://api.rawg.io/api/games?key=b7b1b42400a549ada462bed213a5844a&publishers=${idPublisher}&page=${currentPage}`;
    const [allGames, setAllGames] = useState([]);
    const { data, error, loading, updateUrl } = useFetch(initialUrl);
    const [cardLayout, setCardLayout] = useState(true);


    // Resetta le variabili all'apertura della pagina, svuota allgames e imposta ad 1 la pagina
    useEffect(() => {
        const newUrl = `https://api.rawg.io/api/games?key=b7b1b42400a549ada462bed213a5844a&publishers=${idPublisher}&page=${currentPage}${sort ? `&ordering=${sort}` : ''}`
        updateUrl(newUrl);
    }, [sort, currentPage, idPublisher, updateUrl]);


    useEffect(() => {
        setCurrentPage(1);
        setAllGames([]);
        setSort('');
    }, [ idPublisher]) 

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
                param={namePublisher} 
                gameCount={data?.count} 
                title="Editore" 
                cardLayout={cardLayout} 
                setCardLayout={setCardLayout}/>
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