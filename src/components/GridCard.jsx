import CardGame from "./CardGame";
import { PuffLoader } from "react-spinners";
import Loader from "./Loader";

export default function GridCard({ loading, setCurrentPage, isFetchingMore, setIsFetchingMore, gameList, fetchData }) {
    return (
        <>
            {loading && gameList.length === 0 ? (
                // Loader iniziale
                <Loader />
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4 md:mx-2 y-8">
                        {gameList.map((game) => (
                            <CardGame key={game.id} game={game} />
                        ))}
                    </div>

                    {gameList.length > 0 && gameList.length < (fetchData?.count || Infinity) && (
                        <div className="flex flex-col items-center my-8 gap-2">
                            {isFetchingMore ? (
                                <div className="flex justify-center items-center">
                                    <PuffLoader size="60px" speedMultiplier={2} />
                                </div>
                            ) : (
                                <button
                                    onClick={() => {
                                        setIsFetchingMore(true);
                                        setCurrentPage(prev => prev + 1);
                                    }}
                                    className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Carica più giochi
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    )
}