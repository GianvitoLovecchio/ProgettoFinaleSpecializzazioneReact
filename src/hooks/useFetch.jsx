import { useState, useEffect, useCallback } from "react";

function useFetch(initialUrl) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // aggiunto per gestire gli errori
    const [url, updateUrl] = useState(initialUrl); //assegna allo stato url, l'url che gli passiamo come argomento

    const load = useCallback(async function () {
        setData(null);//setta lo stato iniziale
        if (!url) { //se l'url è vuoto setta l'errore con il messaggio e non esegue la chiamata
            setError("Error URL!")
            return;
        } else { //altrimenti assegna l'url
            updateUrl(url);
        }
        setLoading(true);//setta a true il loading

        try { //viene eseguito il blocco
            const response = await fetch(url);

            if (!response.ok) { // se la risposta non è ok, setta l'errre
                throw new Error(response.statusText);
            }
            const json = await response.json(); //altrimenti setta il risultato della chiamata
            setData(json);

        } catch (error) { // in caso di errore
            setError(error.message); // imposta l'errore nello stato
            setData(null); // opzionale: resetta i dati in caso di errore
        } finally {

            setLoading(false); // sempre false, errore o successo
        }
    }, [url]);

    useEffect(() => {
        load();
    }, [url]);

    return {
        data,
        loading,
        error, 
        load,
        updateUrl,

    };
}

export default useFetch;
