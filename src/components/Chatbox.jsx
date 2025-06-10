import { useContext } from "react";
import SessionContext from "../context/SessionContext";
import supabase from "../supabase/supabase-client";
import RealtimeChat from "./RealtimeChat";
import { SendHorizontal } from "lucide-react";

export default function Chatbox({ data }) {
    const { session } = useContext(SessionContext);

    const handleMessageSubmit = async (event) => {
        event.preventDefault();
        const inputMessage = event.currentTarget;
        const { message } = Object.fromEntries(new FormData(inputMessage));
        if (typeof message === "string" && message.trim().length !== 0) {
            const { error } = await supabase
                .from('messages')
                .insert([
                    {
                        profile_id: session?.user.id,
                        profile_username: session?.user.user_metadata.username,
                        game_id: data.id,
                        content: message,
                    }
                ])
                .select();

            if (error) {
                console.log(error)
            } else {
                inputMessage.reset();
            }
        }
    }

    return (
        <>
            <div className="rounded border border-blue-600 w-72">
                <h4 className="text-center font-bold text-blue-600 border-b border-blue-600">Gamers chat</h4>
                <div>
                    <RealtimeChat data={data && data} />
                </div>
                <div>
                    <form className="w-72" onSubmit={handleMessageSubmit}>
                        <fieldset className="flex items-center rounded-bl border-r border-blue-600 rounded-br rounded-tr bg-blue-100 pr-0 " role="group">
                            <input
                                className="bg-red-transparent flex-1 h-6 p-2 border-t border-blue-600 rounded-bl rounded-br text-[12px] focus:outline-none"
                                type="text"
                                name="message"
                                placeholder="Chat..."
                            />
                            <button
                                className="cursor-pointer rounded-br bg-blue-600 hover:bg-green-700 text-white h-6 font-bold py-0 px-3 "
                                type="submit"
                            >
                                <SendHorizontal strokeWidth={2} size={15} />
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    )
}