import { useState, useEffect, useCallback, useContext } from "react";
import supabase from "../supabase/supabase-client";
import FavoritesContext from "./FavoritesContext";
import SessionContext from "./SessionContext";

export default function FavoritesProvider({ children }) {
  const { session } = useContext(SessionContext);
  const [favorites, setFavorites] = useState([]);

  const getFavorites = useCallback(async () => {
    let { data: favourites, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", session?.user.id);
    if (error) {
      console.log(error);
      console.log("Errore in console");
    } else {
      setFavorites(favourites);
    }
  }, [session]);

  const addFavorites = async (game) => {
    const { data, error } = await supabase
      .from("favorites")
      .insert([
        {
          user_id: session?.user.id,
          game_id: game.id,
          game_name: game.name,
          game_image: game.background_image,
        },
      ])
      .select();

    if (!error && data) {
      setFavorites((prev) => [...prev, ...data]);
    }
  };

  const removeFavorites = async (gameId) => {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("game_id", gameId)
      .eq("user_id", session?.user.id);

    if (!error) {
      setFavorites((prev) =>
        prev.filter((fav) => +fav.game_id !== +gameId)
      );
    }
  };

  useEffect(() => {
    if (session) {
      getFavorites()
    }
    const favorites = supabase
      .channel("favorites")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "favorites" },
        () => getFavorites()
      )
      .subscribe();

    return () => {
      if (favorites) {
        supabase.removeChannel(favorites);
      }
      favorites.unsubscribe();
    };
  }, [getFavorites, session]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, setFavorites, addFavorites, removeFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
