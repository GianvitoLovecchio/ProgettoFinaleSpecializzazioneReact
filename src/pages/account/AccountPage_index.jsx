import { useState, useEffect, useContext } from 'react';
import supabase from '../../supabase/supabase-client';
import SessionContext from '../../context/SessionContext';
import InputFormUpdate from '../../components/InputFormUpdate';
import Avatar from '../../components/Avatar';
import { useProfile } from '../../context/ProfileProvider';

export default function AccountPage_index() {
    const { session } = useContext(SessionContext);
    const { profile, setProfile, avatarImgUrl, setAvatarImgUrl } = useProfile();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    // const [avatar_url, setAvatarUrl] = useState(null);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [phone, setPhone] = useState(null);


    //poi passare come parametro anche avtarUrl

    useEffect(() => {
        if (profile) {
            setUsername(profile.username || '');
            setFirstName(profile.first_name || '');
            setLastName(profile.last_name || '');
            setPhone(profile.phone || '');
            setLoading(false);
        }
    }, [profile]);

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
            updated_at: new Date(),
        };

        const { error } = await supabase.from('profiles').upsert(updates);
        if (error) {
            alert(error.message);
        }
        else {
            setProfile((prev) => ({
                ...prev,
                ...updates,
            }));
        }
        setLoading(false);
    }

    const updateAvatarOnly = async (url) => {
        const { user } = session;// estrai i dati dell'utente loggato

        const { error } = await supabase
            .from('profiles')
            .update({ avatar_url: url, updated_at: new Date() })// viene aggiornato il DB
            .eq('id', user.id);//garantise che le modifiche riguardino solo l'utente loggato

        // se rileva un errore lo stampa    
        if (error) {
            alert("Errore durante l'aggiornamento dell'avatar: " + error.message);
        } else {
            // altrimenti viene scaricata l'immagine da avatars
            const { data, error: imageError } = await supabase.storage
                .from('avatars')
                .download(url)
            // se non ci sono errori e l'immagine esiste, viene settato l'url dell'immagine disponibile globalmente
            if (!imageError && data) {
                const objectUrl = URL.createObjectURL(data);
                setAvatarImgUrl(objectUrl);
                setProfile((prev) => ({
                    ...prev,
                    avatar_url: url,
                }));
            }
        }
    };


    return session ? (
        <>
            <h1 className="text-3xl text-blue-600 font-semibold mb-5">Aggiorna i tuoi dati</h1>
            <div className="flex items-center justify-center p-4 ">
                <div className="w-full max-w-4/5 ">
                    <form
                        onSubmit={updateProfile}
                        className="p-10 rounded-xl shadow-md bg-blue-50">
                        <Avatar
                            url={profile?.avatar_url}
                            size={150}
                            onUpload={async (_event, url) => {
                                await updateAvatarOnly(url);
                            }}
                        />
                        {/* Username e telefono */}
                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <InputFormUpdate
                                    onChangeFunction={setUsername}
                                    valor={username}
                                    label="Username"
                                    type="text"
                                    id="username" />
                            </div>

                            <div>
                                <InputFormUpdate
                                    onChangeFunction={setPhone}
                                    valor={phone}
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
                                    valor={first_name}
                                    label="Nome"
                                    type="text"
                                    id="first_name" />
                            </div>
                            <div>
                                <InputFormUpdate
                                    onChangeFunction={setLastName}
                                    valor={last_name}
                                    label="Cognome"
                                    type="text"
                                    id="last_name" />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-red-800 border border-red-800 rounded-lg text-white mt-4 hover:scale-105 transition duration-500 hover:bg-blue-50 hover:text-black cursor-pointer block ml-auto mt-8 px-4 py-1.5">
                            Salva modifiche
                        </button>
                    </form>
                </div>
            </div>
        </>
    ) : (
        <h1 className="text-3xl text-center text-blue-600 font-semibold my-20 block mx-auto">Pagina non disponibile per gli utenti non loggati.</h1>

    )
        ;
}   