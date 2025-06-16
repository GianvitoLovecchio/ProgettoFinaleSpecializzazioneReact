import { useState, useEffect, useContext } from 'react';
import supabase from '../../supabase/supabase-client';
import SessionContext from '../../context/SessionContext';
import InputFormUpdate from '../../components/InputFormUpdate';
import Avatar from '../../components/Avatar';
import { useProfile } from '../../context/ProfileProvider';
import Message from '../../components/Message';
import { UserPen } from 'lucide-react';

export default function AccountPage_index() {
    const { session } = useContext(SessionContext);
    const { profile, setProfile, avatarImgUrl, setAvatarImgUrl } = useProfile();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [updatedProfile, setUpdatedProfile] = useState(null)
    const [updatedAvatar, setUpdatedAvatar] = useState(null)
    const [noEdit, setNoEdit] = useState(true);


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
            setUpdatedProfile(false)
        }
        else {
            setProfile((prev) => ({
                ...prev,
                ...updates,
            }));
        }
        setLoading(false);
        setUpdatedProfile(true);
        setNoEdit(true);
    }

    const updateAvatarOnly = async (url) => {
        const { user } = session;// estrai i dati dell'utente loggato
        if (updatedAvatar !== null) {
            setUpdatedAvatar(null);
        }
        if (updatedProfile !== null) {
            setUpdatedProfile(null);
        }
        const { errorAvatar } = await supabase
            .from('profiles')
            .update({ avatar_url: url, updated_at: new Date() })// viene aggiornato il DB
            .eq('id', user.id);//garantise che le modifiche riguardino solo l'utente loggato

        // se rileva un errore lo stampa    
        if (errorAvatar) {
            setUpdatedAvatar(errorAvatar);
            // alert("Errore durante l'aggiornamento dell'avatar: " + errorAvatar.message);
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
                setUpdatedAvatar(true);
            }
        }
    };


    return session ? (
        <>
            <h1 className="text-3xl text-blue-600 font-semibold mb-5">I tuoi dati</h1>
            {/* messaggi di errore/successo */}
            {updatedAvatar !== null &&
                <Message
                    message={{ updatedAvatar } ? "Avatar aggiornato con successo!" : "Aggiornamento avatar non riuscito, riprovare."}
                    esito={updatedAvatar}
                    setStatede={setUpdatedAvatar} />
            }
            {updatedProfile !== null &&
                <Message message={{ updatedProfile } ? "Profilo aggiornato con successo!" : "Aggiornamento del  profilo non riuscito, riprovare."}
                    esito={updatedProfile}
                    setState={setUpdatedProfile} />
            }
            {/* form */}
            <div className="flex items-center justify-center md:p-4 ">
                <div className="w-full md:max-w-4/5 ">
                    <form
                        onSubmit={updateProfile}
                        className="px-10 pb-10 pt-4 rounded-xl shadow-md bg-blue-50">
                        {/* bottone di modifica */}
                        {noEdit ?
                        <div className="flex justify-end text-blue-600">
                            <UserPen size={35} onClick={() => setNoEdit(false)} className='md:hover:scale-120 cursor-pointer md:duration-400'/>
                        </div>
                        :
                        <div>
                            <h1  className=' text-blue-600 text-2xl font-semibold'>Modifica i tuoi dati</h1>
                        </div>
                        }
                        {/* avatar */}
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
                                    id="username"
                                    noEdit={noEdit} />
                            </div>

                            <div>
                                <InputFormUpdate
                                    onChangeFunction={setPhone}
                                    valor={phone? phone : "1234567890"}
                                    label="Telefono"
                                    type="text"
                                    id="phone"
                                    noEdit={noEdit} />
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
                                    id="first_name"
                                    noEdit={noEdit} />
                            </div>
                            <div>
                                <InputFormUpdate
                                    onChangeFunction={setLastName}
                                    valor={last_name}
                                    label="Cognome"
                                    type="text"
                                    id="last_name"
                                    noEdit={noEdit} />
                            </div>
                        </div>

                        {/* Submit Button */}
                        {!noEdit ?
                            <button
                                type="submit"
                                className="bg-red-800 border border-red-800 rounded-lg text-white mt-4 hover:scale-105 transition duration-500 hover:bg-blue-50 hover:text-black cursor-pointer block ml-auto mt-8 px-4 py-1.5">
                                Salva modifiche
                            </button> : null
                        }
                    </form>
                </div>
            </div>
        </>
    ) : (
        <h1 className="text-3xl text-center text-blue-600 font-semibold my-20 block mx-auto">Pagina non disponibile per gli utenti non loggati.</h1>

    )
        ;
}   