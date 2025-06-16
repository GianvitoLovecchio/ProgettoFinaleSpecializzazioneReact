import { useState } from "react";
import { ConfirmSchema, getErrors, getFieldError } from "../../lib/validationForm";
import InputFormRegistration from "../../components/InputFormRegistration";
import PasswordForm from "../../components/PasswordForm";
import supabase from "../../supabase/supabase-client";
import { useNavigate } from "react-router";
import noImage from "../../img/no_img_profile.png";
import Message from "../../components/Message";


export default function RegistrationForm() {
    const navigate = useNavigate();

    //stato per la visualizzazione dei messaggi di errore/successo
    const [signInState, setSignInState] = useState(null);

    // Stato unico per la form con valori e errori
    const [formState, setFormState] = useState({
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        avatar_url: "",
    });

    // Stato per errori (singolo oggetto)
    const [formErrors, setFormErrors] = useState({});

    // Stato per campi toccati (per validazione onBlur)
    const [touchedFields, setTouchedFields] = useState({});

    // Stato per mostrare/nascondere password
    const [showPassword, setShowPassword] = useState(false);

    // Preview immagine avatar
    const [previewUrl, setPreviewUrl] = useState(null);

    //funzione che parte al click del bottone di invio, 
    const onSubmit = async (event) => {
        event.preventDefault();
        //effettua la validazione
        const { error, data } = ConfirmSchema.safeParse(formState);

        //se ci sono errori, setta l'oggetto con gli errori
        if (error) {
            //viene richiamata la funzione per ottenere gli errori
            const errors = getErrors(error);
            //setta l'oggetto con gli errori risultanti dalla funzione appena richiamata
            setFormErrors(errors);
            // Metto tutti i campi come toccati per mostrare errori
            const allTouched = Object.keys(formState).reduce((acc, key) => {
                acc[key] = true;
                return acc;
            }, {});
            setTouchedFields(allTouched);
            return;
        }
        //se non ci sono errori, effettua la registrazione dell'utente utilizzando nmail e password come dati
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: formState.email,
            password: formState.password,
            options: {
                data: {
                    first_name: formState.firstName,
                    last_name: formState.lastName,
                    username: formState.username,
                    phone: formState.phone,
                    avatar_url: formState.avatar_url || noImage,
                },
            },
        });


        //se ci sono errori, mostra un messaggio di errore
        if (signUpError) {
            setSignInState(false)
            return;
            //altrimenti mostra un messaggio di successo e reindirizza alla home dopo 2 secondi
        } else {
            setSignInState(true)
        }

        const { error: insertError } = await supabase
            .from('profiles')
            .insert({
                id: signUpData.user.id,
                username: formState.username,
                first_name: formState.firstName,
                last_name: formState.lastName,
                avatar_url: formState.avatar_url,
                phone: formState.phone,
            });

        if (insertError) {
            console.log("Errore inserimento profilo:", insertError);
            return;
        }
    }

    //valida un determinato campo non appena viene popolato ed abbandonato dall'utente
    //riceve il campo in ingresso, field
    const onBlur = (field) => () => {
        //viene richiamata la funzione per ottenere gli errori
        const errorMessage = getFieldError(field, formState[field]);
        //se ci sono errori, setta l'oggetto con gli errori
        setFormErrors((prev) => ({ ...prev, [field]: errorMessage }));
        //setta il campo come toccato
        setTouchedFields((prev) => ({ ...prev, [field]: true }));
    }

    //determina se un campo è da considerare non valido o meno, per mostrare gli errori visivamente
    const isInvalid = (field) => touchedFields[field] && !!formErrors[field];

    //funzione per impostare il valore di un determinato campo
    //riceve il campo in ingresso, property ed un'opzionale funzione per ottenere il valore tramite una specifica estrazione
    const setField = (field) => (e) => {
        const value = e.target.value;
        setFormState((prev) => ({ ...prev, [field]: value }));
    };

    //funzione per il caricamento dell'immagine
    const handleAvatarUpload = async (e) => {
        // viene preso il file caricato
        const file = e.target.files[0];

        // se il file non esiste, esce
        if (!file) return;

        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);

        //genera un nome univoco per il file, 
        const fileExt = file.name.split('.').pop();// prende l'estensione del file
        const fileName = `${formState.username || Date.now()}.${fileExt}`;// se è presente uno usern name da quel nome, altrimenti data e ora attuali
        const filePath = `public/${fileName}`;// salva in public il file

        //carica il file in supabase Storage, se trova errori li salva in uploadError
        const { error: uploadError } = await supabase.storage
            .from('avatars') // usa il nome del tuo bucket
            .upload(filePath, file);

        //se c'è errore, lo stampa
        if (uploadError) {
            alert("Errore durante il caricamento dell'immagine", uploadError.message);
            return;
        }

        //ottiene l'url pubblico del file
        const { data } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);

        //salva l'url pubblico nel formState
        setFormState((prev) => ({
            ...prev,
            avatar_url: filePath, // URL pubblico da salvare nel profilo
        }));
    };


    return (
        <>
            <h1 className="text-3xl text-blue-600 font-semibold mb-5">Registrazione</h1>
            {signInState === false &&
                <Message
                    message="La resistrazione non è andata a buon fine!"
                    esito={signInState}
                    redirectState={signInState}
                    setState={setSignInState} />
            }
            {signInState === true &&
                <Message
                    message="La resistrazione è andata a buon fine, a breve verrai reindirizzata alla homepage!"
                    esito={signInState}
                    redirectState={signInState}
                    redirect="/" />
            }
            <div className="flex items-center justify-center md:p-4 ">
                <div className="w-full md:max-w-4/5 ">
                    <form
                        onSubmit={onSubmit}
                        className="px-5 py-6 md:p-10 rounded-xl shadow-md bg-blue-50">
                        {/* Email */}
                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <InputFormRegistration
                                    onChangeFunction={setField("email")}
                                    onBlurFunction={onBlur("email")}
                                    ariaInvalidFunction={isInvalid("email")}
                                    value={formState.email}
                                    label="Email"
                                    type="email"
                                    id="email"
                                    formErrors={formErrors} />
                            </div>

                            <div>
                                <InputFormRegistration
                                    onChangeFunction={setField("phone")}
                                    onBlurFunction={onBlur("phone")}
                                    ariaInvalidFunction={isInvalid("phone")}
                                    value={formState.phone}
                                    label="Telefono"
                                    type="text"
                                    formErrors={formErrors}
                                    id="phone" />
                            </div>
                        </div>

                        {/* First Name & Last Name (affiancati su md+) */}
                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <InputFormRegistration
                                    onChangeFunction={setField("firstName")}
                                    onBlurFunction={onBlur("firstName")}
                                    ariaInvalidFunction={isInvalid("firstName")}
                                    value={formState.firstName}
                                    label="Nome"
                                    type="text"
                                    formErrors={formErrors}
                                    id="firstName" />
                            </div>
                            <div>
                                <InputFormRegistration
                                    onChangeFunction={setField("lastName")}
                                    onBlurFunction={onBlur("lastName")}
                                    ariaInvalidFunction={isInvalid("lastName")}
                                    value={formState.lastName}
                                    label="Cognome"
                                    type="text"
                                    formErrors={formErrors}
                                    id="lastName" />
                            </div>
                        </div>

                        {/* Username */}
                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div >
                                <InputFormRegistration
                                    onChangeFunction={setField("username")}
                                    onBlurFunction={onBlur("username")}
                                    ariaInvalidFunction={isInvalid("username")}
                                    value={formState.username}
                                    label="Username"
                                    type="text"
                                    formErrors={formErrors}
                                    id="username" />
                            </div>

                            {/* Password */}
                            <div >
                                <PasswordForm
                                    onChangeFunction={setField("password")}
                                    onBlurFunction={onBlur("password")}
                                    ariaInvalidFunction={isInvalid("password")}
                                    label="Password"
                                    value={formState.password}
                                    formErrors={formErrors}
                                    id="password"
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword} />
                            </div>
                        </div>

                        {/* Avatar upload */}
                        <label className="block text-gray-700 font-semibold mb-1">
                            Immagine di profilo
                        </label>
                        <div className="mb-4 border border-gray-300 rounded-md py-2 ">
                            <div className="flex justify-evenly">
                                <input
                                    type="file"
                                    id="single"
                                    accept="image/"
                                    onChange={handleAvatarUpload}
                                    className="hidden px-3 py-1 focus:outline-none "
                                />
                                {/* anteprima immagine caricata */}
                                {previewUrl && (
                                    <div className="mt-2">
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-24 h-24 rounded-full object-cover "
                                        />
                                    </div>
                                )}
                                <label
                                    htmlFor="single"
                                    className="my-auto pl-3 py-1 w-32 cursor-pointer items-center text-sm bg-red-800 border border-red-800 rounded-lg text-white hover:scale-105 transition duration-500 hover:bg-blue-50 hover:text-black transition disabled:opacity-50">
                                    {/* {uploading ? "Uploading ..." : "Modifica"} */}Carica immagine
                                </label>

                            </div>
                        </div>

                        {/* Submit Button */}
                        <button

                            type="submit"
                            className="bg-red-800 border border-red-800 rounded-lg text-white mt-4 hover:scale-105 transition duration-250 hover:bg-blue-50 hover:text-black cursor-pointer block mx-auto px-4 py-1.5">
                            Registrati
                        </button>
                    </form>
                </div >
            </div >
        </>
    );
}
