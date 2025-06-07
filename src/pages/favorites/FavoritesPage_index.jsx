import { useContext } from "react";
import FavoritesContext from "../../context/FavoritesContext";
import SessionContext from "../../context/SessionContext";
import CardGame from "../../components/CardGame";

export default function FavoritesPage_index() {
    const { favorites } = useContext(FavoritesContext);
    const { session } = useContext(SessionContext);
    // const length = favorites.length;

    return (
        <>
            {session ? (
                favorites?.length > 0 ?
                    (
                        <>
                            <h1 className="text-4xl font-bold text-blue-600 m-4">I tuoi preferiti</h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4 md:mx-2 y-8">
                                {favorites.map((game) => (
                                    <CardGame key={game.id} game={game} preferito={true} />
                                ))}
                                {console.log(favorites)}
                            </div>
                        </>
                    ) : (
                        <div className="h-[calc(100vh-200px)] flex items-center justify-center">
                            <h1 className="text-2xl font-medium italic text-blue-600 m-12 ">Non hai ancora aggiunto nessun gioco ai tutoi preferiti!</h1>
                        </div>
                    )
            ) : (
                <h1 className="text-5xl font-bold text-center m-4">Devi essere loggato per vedere i preferiti</h1>
            )
            }
        </>
    )
}