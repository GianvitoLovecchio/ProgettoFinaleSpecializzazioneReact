import { HeartPlus, HeartMinus } from "lucide-react";
import { useContext } from "react";
import FavoritesContext from "../context/FavoritesContext";
import supabase from "../supabase/supabase-client";

export default function ToggleFavorite({ data, size }) {
    const { favorites, addFavorites, removeFavorites } = useContext(FavoritesContext);

    const isFavorite = favorites.some((el) => +el.game_id === data?.id);



    return (
        <>
            {isFavorite ? (
                <button className="text-red-600 cursor-pointer md:hover:scale-140 md:duration-400 md:hover:font-bold flex items-top" onClick={() => removeFavorites(data.id)}>
                    <HeartMinus strokeWidth={3} size={size} />
                </button>
            ) : (
                <button className="cursor-pointer md:hover:scale-140 md:duration-400 md:hover:font-bold flex items-top" onClick={() => addFavorites(data)}>
                    < HeartPlus color="#2563eb" strokeWidth={2} size={size}/>
                </button >
            )
            }
        </>
    )
}