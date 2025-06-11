import { useState, useEffect } from 'react'
import GlobalContext from './GlobalContext'

export default function GlobalProvider({ children }) {
    const [sort, setSort] = useState("");
    const [asc, setAsc] = useState(true);
    const [url, setUrl] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const baseUrl = `https://api.rawg.io/api/games?key=25026496f67e4b888b43a18359248003`;

    // funzione per aggiornare l'ordinamento (sort + ascendente/descendente)
    const setOrdering = (newSort, newAsc = asc) => {
        setSort(newSort);
        setAsc(newAsc);
        setCurrentPage(1); // resetto pagina quando cambia ordinamento
    };

    // aggiorna URL ogni volta che cambia sort, asc o currentPage
    useEffect(() => {
        const direction = asc ? "" : "-";
        const ordering = sort ? `&ordering=${direction}${sort}` : "";
        const newUrl = `${baseUrl}&page=${currentPage}${ordering}`;
        setUrl(newUrl);
        console.log("Nuovo URL:", newUrl);
    }, [sort, asc, currentPage]);

    return (
        <GlobalContext.Provider
            value={{
                sort,
                asc,
                currentPage,
                setCurrentPage,
                url,
                setOrdering,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}