import { useParams, Link } from "react-router"
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import SessionContext from "../../context/SessionContext";
import LazyLoadGameImage from "../../components/LazyLoadGameImage";
import ToggleFavorite from "../../components/ToggleFavorite";
import Loader from "../../components/Loader";
import { MessageSquare, X } from "lucide-react";
import platformLogos from "../../components/PlatformsArray";
import Chatbox from "../../components/Chatbox";

export default function GamePage_index() {
    const { session } = useContext(SessionContext)
    const { slug, id } = useParams()
    const [showChatbox, setShowChatbox] = useState(false)
    const { data: data } = useFetch(
        `https://api.rawg.io/api/games/${id}?key=95c63224923a4b51aa9ed6a0e37cf486`
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

    const getRatingColor = (rating) => {
        if (rating < 3) return "bg-red-800";
        if (rating < 4) return "bg-yellow-400";
        return "bg-green-800";
    };

    return (
        <div className="max-w-5xl mx-auto bg-blue-60 rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mt-4 md:mt-8">
            {console.log(data)}
            {/* {console.log(data_platforms)} */}
            <div className="flex flex-row justify-between sm:items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-blue-600">{data.name}
                    <span className={`mx-2 my-1 font-bold text-[12px] text-white rounded-lg px-1.5 py-1 items-center ${getRatingColor(data.rating)}`}>
                        {data.rating}
                    </span>
                </h1>
                {session &&
                    <div className="hidden md:flex gap-x-4">
                        {showChatbox ?
                            <X onClick={() => setShowChatbox(false)} size={40} strokeWidth={2} color="#933E1B" className="cursor-pointer hover:scale-140 duration-400 hover:font-bold relative" />
                            :
                            <MessageSquare onClick={() => setShowChatbox(true)} size={35} strokeWidth={2} color="#2563eb" className="cursor-pointer hover:scale-140 duration-400 hover:font-bold relative" />
                        }
                        <ToggleFavorite data={data} size={35} />
                        {showChatbox &&
                            <div className="m-4 absolute z-2 right-48 top-35 ">
                                <Chatbox data={data && data} />
                            </div>
                        }
                    </div>
                }
            </div>

            <div className="my-8 md:flex justify-center md:flex-nowrap">
                <LazyLoadGameImage image={data.background_image} detail={true} />
                {data.background_image_additional &&
                    <LazyLoadGameImage image={data.background_image_additional} detail={true} />
                }
            </div>

            <div className="text-md text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                {showMore ? data.description_raw : truncatedDescription}
                {data.description_raw.length > 300 && (
                    <button
                        className="cursor-pointer text-blue-600 text-lg font-semibold ml-2 hover:underline"
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
                                <Link key={index} to={`/platform/${match.id}`}>
                                    <img
                                        className="w-8 h-8 p-1 rounded-full bg-white border border-blue-600"
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
                    <p className="font-semibold text-lg">Sviluppatori: </p>
                    <div className="flex flex-wrap gap-2">
                        {/* {console.log(data.developers)} */}
                        {data.developers.map((developer, index) => (
                            <Link to={`/developer/${developer.id}/${developer.name}`} key={index}>
                                <span className="md:hover:text-blue-600 ">
                                    {developer.name}
                                </span>
                                {/* {console.log(developer)} */}
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="font-semibold text-lg">Genere: </p>
                    <div className="flex flex-wrap gap-2">
                        {data.genres.map((genre, index) => (
                            <Link to={`/games/${genre.slug}`} key={index}>
                                <span className="md:hover:text-blue-600 ">
                                    {genre.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="font-semibold text-lg">Tags: </p>
                    <div className="flex flex-wrap gap-2">
                        {data.tags.map((tag, index) => (
                            <Link to={`/tag/${tag.slug}`} key={index}>
                                <span className="md:hover:text-blue-600">
                                    {tag.name}
                                </span>
                                /</Link>
                        ))}
                    </div>
                </div>
            </div>


        </div>
    )

}