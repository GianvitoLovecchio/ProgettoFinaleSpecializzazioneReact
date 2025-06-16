import { useContext } from "react";
import FavoritesContext from "../../context/FavoritesContext";
import SessionContext from "../../context/SessionContext";
import CardGame from "../../components/CardGame";
import  {Link}  from "react-router";

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
                            <h1 className="text-4xl font-bold text-blue-600 md:my-8 md:m-4 mb-6">I tuoi preferiti</h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-2 md:mx-4 y-8">
                                {favorites.map((game) => (
                                    <CardGame key={game.id} game={game} preferito={true} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="h-[calc(100vh-200px)] flex items-center justify-center">
                            <h1 className="text-2xl font-medium italic text-blue-600 m-12 ">Non hai ancora aggiunto nessun gioco ai tutoi preferiti!</h1>
                        </div>
                    )
            ) : (
                <h1 className="text-3xl text-blue-500 italic font-normal text-center m-4 md:mt-30 ">
                    Effettua il 
                <Link to="/login"> <span className="font-extrabold md:hover:underline">login</span> </Link>
                per visualizzare i tuoi preferiti o 
                <Link to="/register"> <span className="font-extrabold md:hover:underline">registrati</span> </Link>
                per creare la tua lista di giochi preferiti.
                </h1>
            )
            }
        </>
    )
}