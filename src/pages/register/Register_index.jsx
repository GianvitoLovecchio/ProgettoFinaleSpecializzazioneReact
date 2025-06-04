import { useState } from "react";
import {
    ConfirmSchema,
    getErrors,
    getFieldError,
} from "../../lib/validationForm";
import InputFormRegistration from "../../components/InputFormRegistration";
import PasswordForm from "../../components/PasswordForm";
import supabase from "../../supabase/supabase-client";
import { useNavigate } from "react-router";


export default function RegistrationForm() {
    const navigate = useNavigate();
    //vengono dichiarati e inizializzati gli stati
    //utilizzato per capire se il form è stato inviato almeno una volta
    const [fromSubmitted, setFormSubmitted] = useState(false);
    //oggetto con gli errori per ogni campo
    const [formErrors, setFormErrors] = useState({});
    //tiene conto dei campi che sono stati toccati
    const [touchFields, setTouchFields] = useState({});
    //constiene i valori inseriti nei campi
    const [formState, setFormState] = useState({
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    //funzione che parte al click del bottone di invio, 
    const onSubmit = async (event) => {
        event.preventDefault();
        //setta il formSubmitted a true, indicando che è stato inviato
        setFormSubmitted(true);
        //effettua la validazione
        const { error, data } = ConfirmSchema.safeParse(formState);


        //se ci sono errori, setta l'oggetto con gli errori
        if (error) {
            //viene richiamata la funzione per ottenere gli errori
            const errors = getErrors(error);
            //setta l'oggetto con gli errori risultanti dalla funzione appena richiamata
            setFormErrors(errors);
        } else {
            //se non ci sono errori, effettua la registrazione dell'utente utilizzando nmail e password come dati
            let { error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                //in più aggiunge gli altri dati relativi all'utente
                options: {
                    data: {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        username: data.username,
                        phone: data.phone,
                    }
                }
            });
            //se ci sono errori, mostra un messaggio di errore
            if (error) {
                alert("La registrazione non è andata a buon fine");
                //altrimenti mostra un messaggio di successo e reindirizza alla home dopo 2 secondi
            } else {
                alert("La resistrazione è stata effettuata con successo! Verrai reindirizzato alla homepage.");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                navigate("/");
            }
        }
    }

    //valida un determinato campo non appena viene popolato ed abbandonato dall'utente
    //riceve il campo in ingresso, property
    const onBlur = (property) => () => {
        //viene richiamata la funzione per ottenere gli errori
        const message = getFieldError(property, formState[property]);
        //se ci sono errori, setta l'oggetto con gli errori
        setFormErrors((prev) => ({ ...prev, [property]: message }));
        //setta il campo come toccato
        setTouchFields((prev) => ({ ...prev, [property]: true }));
    }

    //determina se un campo è da considerare non valido o meno, per mostrare gli errori visivamente
    const isInvalid = (property) => {
        //se il campo non è stato toccato, restituisce undefined
        if (fromSubmitted || touchFields[property]) {
            //se il campo ha un errore, restituisce true
            return !!formErrors[property];
        }
        return undefined;
    }

    //funzione per impostare il valore di un determinato campo
    //riceve il campo in ingresso, property ed un'opzionale funzione per ottenere il valore tramite una specifica estrazione
    const setField = (property, valueSelector) => (e) => {
        //setta il campo
        setFormState((prev) => ({
            //viene copiato l'oggetto precedente e viene aggiunto il nuovo valore
            ...prev,
            //il nuovo valore viene assegnato al campo
            [property]: valueSelector ? valueSelector(e) : (e.target.value)
        }));
    }

    return (
        <>
            <h1 className="text-3xl text-blue-600 font-semibold mb-5">Form di login</h1>
            <div className="flex items-center justify-center p-4 ">
                <div className="w-full max-w-4/5 ">
                    <form
                        onSubmit={onSubmit}
                        className="p-10 rounded-xl shadow-md bg-blue-50">
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
                        <div className="mb-4">
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
                        <div className="mb-6">
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
