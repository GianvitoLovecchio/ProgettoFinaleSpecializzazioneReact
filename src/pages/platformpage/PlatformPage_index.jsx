import { useParams } from "react-router"
import { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch"
import PlatformsArray from "../../components/PlatformsArray"
import GridCard from "../../components/GridCard"
import ControlPanel from "../../components/ControlPanel"



export default function PlatformPage_index() {
    const { id } = useParams();
     const [currentPage, setCurrentPage] = useState(1);
      const [isFetchingMore, setIsFetchingMore] = useState(false);
      const initialUrl = (`https://api.rawg.io/api/games?key=95c63224923a4b51aa9ed6a0e37cf486&platforms=${id}&page=${currentPage}`);
      const [allGames, setAllGames] = useState([]);
    const { data, loading, error, updateUrl } = useFetch(initialUrl);
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

    const myPLatform = PlatformsArray.find((p) => p.id === Number(id));


    return (
        <>
            <div className="flex">
                <h1 className="md:text-3xl text-xl text-blue-600 font-normal mb-5">Giochi per:
                    <span className="font-semibold pl-3">{myPLatform.name}</span>
                </h1>
                <img src={myPLatform.image} alt="" className="bg-white rounded-full md:h-9 md:w-9 w-7 h-7 mx-4" />
            </div>
            <ControlPanel cardLayout={cardLayout} setCardLayout={setCardLayout} />
            <GridCard
                loading={loading}
                setCurrentPage={setCurrentPage}
                isFetchingMore={isFetchingMore}
                setIsFetchingMore={setIsFetchingMore}
                gameList={allGames}
                fetchData={data}
                cardLayout={cardLayout} 
                />
{/* 
            {loading && <Loader />}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4 md:mx-2 y-8">
                {data?.results.map((game) => (
                    <CardGame key={game.id} game={game} />
                ))}

            </div> */}
        </>
    )
}