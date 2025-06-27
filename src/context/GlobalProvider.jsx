import { useState, useEffect } from 'react'
import GlobalContext from './GlobalContext'
import { set } from 'zod/v4';
import { title } from 'framer-motion/client';

export default function GlobalProvider({ children }) {
    const [sort, setSort] = useState("");
    const [asc, setAsc] = useState(true);
    const [url, setUrl] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const options = [
        {title: "Resetta", value: ""},  
        { title: "Nome A-Z", value: "name" },
        { title: "Nome Z-A", value: "-name" },
        { title: "Più recente", value: "-released" },
        { title: "Meno recente", value: "released" },
        { title: "Popolarità crescente", value: "added" },
        { title: "Popolarità decrescente", value: "-added" },
        { title: "Voto metacritic crescente", value: "metacritic" },
        { title: "Voto metacritic decrescente", value: "-metacritic" },
        { title: "Voto utenti crescente", value: "rating" },
        { title: "Voto utenti decrescente", value: "-rating" },
    ];

    const baseUrl = `https://api.rawg.io/api/games?key=b7b1b42400a549ada462bed213a5844a`;

    // funzione per aggiornare l'ordinamento (sort + ascendente/descendente)
    const setOrdering = (newSort, newAsc = asc) => {
        setSort(newSort);
        setAsc(newAsc);
        setCurrentPage(1); // resetto pagina quando cambia ordinamento
    };

    // aggiorna URL ogni volta che cambia sort, asc o currentPage
    // useEffect(() => {
    //     const direction = asc ? "" : "-";
    //     const ordering = sort ? `&ordering=${direction}${sort}` : "";
    //     const newUrl = `${baseUrl}&page=${currentPage}${ordering}`;
    //     setUrl(newUrl);
    // }, [sort, asc, currentPage]);

    return (
        <GlobalContext.Provider
            value={{
                sort,
                setSort,
                currentPage,
                setCurrentPage,
                url,
                setOrdering,
                options,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}