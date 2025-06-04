import { useState, useEffect, useContext } from 'react';
import supabase from '../../supabase/supabase-client';
import SessionContext from '../../context/SessionContext';
import InputFormUpdate from '../../components/InputFormUpdate';

export default function AccountPage_index() {
    const { session } = useContext(SessionContext);

    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    // const [avatar, setAvatar] = useState(null);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [phone, setPhone] = useState(null);


    useEffect(() => {
        let ignore = false;
        const getProfile = async () => {
            if (!session) return;

            setLoading(true)
            const { user } = session;

            const { data, error } = await supabase
                .from('profiles')
                //inserire poi avatar_url sotto
                .select(`username, first_name, last_name, phone`)
                .eq('id', user.id)
                .single();
            if (!ignore) {
                if (error) {
                    console.log(error);
                } else {
                    setUsername(data.username);
                    // setAvatar(data.avatar_url);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setPhone(data.phone);
                }
            }
            setLoading(false)
        }
        getProfile();

        return () => {
            ignore = true
        }
    }, [session])

    //poi passare come parametro anche avtarUrl
    const updateProfile = async (event) => {
        event.preventDefault();

        setLoading(true);
        const { user } = session;

        const updates = {
            id: user.id,
            username,
            first_name,
            last_name,
            phone,
            // avatar_url: avatarUrl,
            updated_at: new Date(),
        };
        const { error } = await supabase.from('profiles').upsert(updates);
        if (error) {
            alert(error.message);
        }
        // else {
        //     setAvatar(avatarUrl);
        // }
        setLoading(false);
    }

    return (
        <>
            {/* {console.log("session", session)} */}
            <h1 className="text-3xl text-blue-600 font-semibold mb-5">Aggiorna i tuoi dati</h1>
            <div className="flex items-center justify-center p-4 ">
                <div className="w-full max-w-4/5 ">
                    <form
                        onSubmit={updateProfile}
                        className="p-10 rounded-xl shadow-md bg-blue-50">
                        {/* Username e telefono */}
                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <InputFormUpdate
                                    onChangeFunction={setUsername}
                                    valor={username || ""}
                                    label="Username"
                                    type="text"
                                    id="username" />
                            </div>

                            <div>
                                <InputFormUpdate
                                    onChangeFunction={setPhone}
                                    valor={phone || ""}
                                    label="Telefono"
                                    type="text"
                                    id="phone" />
                            </div>
                        </div>

                        {/* First Name & Last Name (affiancati su md+) */}
                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <InputFormUpdate
                                    onChangeFunction={setFirstName}
                                    valor={first_name || ""}
                                    label="Nome"
                                    type="text"
                                    id="first_name" />
                            </div>
                            <div>
                                <InputFormUpdate
                                    onChangeFunction={setLastName}
                                    valor={last_name || ""}
                                    label="Cognome"
                                    type="text"
                                    id="last_name" />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-red-800 border border-red-800 rounded-lg text-white mt-4 hover:scale-105 transition duration-250 hover:bg-blue-50 hover:text-black cursor-pointer block mx-auto px-4 py-1.5">
                            Registrati
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}   