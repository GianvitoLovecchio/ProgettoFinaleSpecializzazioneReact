import { useParams } from "react-router"
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import SessionContext from "../../context/SessionContext";
import LazyLoadGameImage from "../../components/LazyLoadGameImage";
import ToggleFavorite from "../../components/ToggleFavorite";
import Loader from "../../components/Loader";
import { Link } from "react-router";
import platformLogos from "../../components/PlatformsArray";

export default function GamePage_index() {
    const { session } = useContext(SessionContext)
    const { slug, id } = useParams()
    const { data: data } = useFetch(
        `https://api.rawg.io/api/games/${id}?key=25026496f67e4b888b43a18359248003`
    )

    const [showMore, setShowMore] = useState(false)

    if (!data) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        )
    }

    const truncatedDescription =
        data.description_raw?.length > 300
            ? data.description_raw.substring(0, 300) + "..."
            : data.description_raw

    return (
        <div className="max-w-5xl mx-auto bg-blue-50 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mt-4 md:mt-8">
            {/* {console.log(data_platforms)} */}
            <div className="flex flex-row justify-between sm:items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-blue-900">{data.name}</h1>
                {session && <ToggleFavorite data={data} size={35} />}
            </div>

            <div className="my-8 md:flex justify-center md:flex-nowrap">
                <LazyLoadGameImage image={data.background_image} detail={true} />
                {data.background_image_additional &&
                    <LazyLoadGameImage image={data.background_image_additional} detail={true} />
                }
            </div>

            <div className="flex flex-wrap gap-2 my-4">
                {data.genres.map((genre, index) => (
                    <Link to={`/games/${genre.slug}`} key={index}>
                        <span
                            className="text-[10px] sm:text-xs font-semibold border border-red-700 bg-red-700 text-white py-1 px-3 rounded-full"
                        >
                            {genre.name}
                        </span>
                    </Link>
                ))}
            </div>

            <div className="text-md text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                {showMore ? data.description_raw : truncatedDescription}
                {data.description_raw.length > 300 && (
                    <button
                        className="cursor-pointer text-blue-800 text-lg font-semibold ml-2 hover:underline"
                        onClick={() => setShowMore((prev) => !prev)}
                    >
                        {showMore ? "Mostra meno" : "Mostra di più"}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-md text-gray-800">
                <div>
                    <p className="font-semibold text-lg">Sviluppatori:</p>
                    <p>{data.developers?.map((d) => d.name).join(", ") || "N/A"}</p>
                </div>
                <div>
                    <p className="font-semibold text-lg">Publisher:</p>
                    <p>{data.publishers?.map((p) => p.name).join(", ") || "N/A"}</p>
                </div>
                <div>
                    <p className="font-semibold text-lg">Data di rilascio:</p>
                    <p>{data.released}</p>
                </div>
                <div>
                    <p className="font-semibold text-lg">Piattaforme:</p>

                    {/* {console.log(data.platforms)} */}
                    <div className="flex gap-2 my-2">
                        {data.platforms?.map((p, index) => {
                            const match = platformLogos.find(
                                (platform) => platform.key === p.platform.slug
                            );
                            return match?.image ? (
                                <Link to={`/platform/${match.id}`}>
                                <img
                                        key={index}
                                        className="w-10 h-10 p-1 rounded-full bg-white border border-blue-500"
                                        src={match.image}
                                        alt={match.name}
                                        title={match.name}
                                    />
                                 </Link>
                            ) : null;
                        })}

                    </div>
                </div>
                <div>
                    <p className="font-semibold text-lg">Rating:</p>
                    <p>{data.rating} / 5 ({data.ratings_count} voti)</p>
                </div>
            </div>
        </div>
    )

}