import { useState, useEffect } from "react";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // aggiunto per gestire gli errori

    useEffect(() => {
        async function load() {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const json = await response.json();
                setData(json);
            } catch (err) {
                setError(error.message); // imposta l'errore nello stato
                setData(null); // opzionale: resetta i dati in caso di errore
            } finally {
                setLoading(false); // sempre false, errore o successo
            }
        }
        load();
    }, [url]);

    return {
        data,
        loading,
        error, // ora disponibile anche l'errore
    };
}

export default useFetch;
