import { useState, useEffect } from "react";
import  supabase  from "../supabase/supabase-client";
import SessionContext from "./SessionContext";

export default function SessionProvider({ children }) {
    const [session, setSession] = useState(null);
    

    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
        };

        getSession();

        // onAuthStateChange è una funzione di supabase che intercetta i cambiamenti di sessione
        const {
             data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            // se l'utente si disconnette, setta la sessione come null
            if (event === "SIGNED_OUT") {
                setSession(null);
            // se l'utente si connette, setta la sessione come l'oggetto session
            } else if (session) {
                setSession(session);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <SessionContext.Provider value={{session}}>
            {children}
        </SessionContext.Provider>
    );
}