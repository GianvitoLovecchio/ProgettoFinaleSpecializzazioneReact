import { useEffect, useState, useRef, useCallback } from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import supabase from '../supabase/supabase-client';
import Loader from "./Loader";

//plugin per utilizzare le diciture tipo "2 min fa"
dayjs.extend(relativeTime);

export default function RealtimeChat({ data }) {
    const [messages, setMessages] = useState([]);// lista messaggi ricevuti
    const [loadingInitial, setLoadingInitial] = useState(false);// loading iniziale
    const [error, setError] = useState("");
    const messageRef = useRef(null);// riferimendo al div per la gestione dello scroll automatico

    //funzione che all'arrivo di un nuovo messaggio, scrolla automaticamente la chat
    const scrollSmoothToBottom = () => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }

    //funzione che prende i messaggi relativi al gioco passato al componente
    const getInitialMessages = useCallback(async () => {
        setLoadingInitial(true);
        const { data: messages, error } = await supabase
            .from("messages")
            .select()
            .eq("game_id", data?.id);
        if (error) {
            setError(error.message);
            return;
        }
        setLoadingInitial(false);
        setMessages(messages);
    }, [data?.id]);

    //
    useEffect(() => {
        if (data) {
            getInitialMessages();
        }
        //si mette in ascolto della tabella messages
        const channel = supabase
            .channel("messages")
            //a qualsisasi cambiamento, vengono ricaricati i messaggi
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "messages" },
                () => getInitialMessages()
            )
            .subscribe();
        //quando il componente viene dismontato, si rimuove l'ascolto
        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }
            channel.unsubscribe();
        };
        //al cambio di data, vengono ricaricati i messaggi
    }, [data, getInitialMessages]);


    //scroll automatico verso il basso ad ogni nuovo messaggio
    useEffect(() => {
        scrollSmoothToBottom();
    }, [messages]);


    return (
        <div className="px-[3px] w-full md:h-[50vh] h-[30vh] flex flex-col justify-end bg-blue-200 overflow-y-scroll" ref={messageRef}>
            {loadingInitial && <Loader/>}
            {error && <article>{error}</article>}
            {messages &&
                messages.map((message) => (
                    <article className="text-end bg-white block ml-auto py-0.5 px-2 my-1 rounded w-[80%]" key={message.id}>
                        <div className="text-start">
                            <p className="font-extrabold text-sm">{message.profile_username}:</p>
                            <p className="text-sm">{message.content}</p>
                        </div>
                            <small className="text-end text-[9px]">{dayjs().to(dayjs(message.updated_at))}</small>
                    </article>
                ))}
        </div>
    );
}
