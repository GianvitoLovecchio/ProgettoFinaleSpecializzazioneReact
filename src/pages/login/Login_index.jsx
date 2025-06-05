import { useState } from "react";
import { FormSchemaLogin, ConfirmSchemaLogin, getErrors, getFieldErrorLogin } from "../../lib/validationForm";
import InputFormRegistration from "../../components/InputFormRegistration";
import PasswordForm from "../../components/PasswordForm";
import supabase from "../../supabase/supabase-client";
import { useNavigate } from "react-router";
import Message from "../../components/Message";
import { X } from "lucide-react";
import { set } from "zod/v4";

export default function Login_index() {
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
        password: "",
    });
    // const [loginError, setLoginError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loginState, setLoginState] = useState(null);

    const onSubmit = async (event) => {
        event.preventDefault();
        //setta il formSubmitted a true, indicando che è stato inviato
        setFormSubmitted(true);
        //effettua la validazione
        const { error, data } = ConfirmSchemaLogin.safeParse(formState);
        //se ci sono errori, setta l'oggetto con gli errori
        if (error) {
            //viene richiamata la funzione per ottenere gli errori
            const errors = getErrors(error);
            //setta l'oggetto con gli errori risultanti dalla funzione appena richiamata
            setFormErrors(errors);
        } else {
            //se non ci sono errori, effettua la registrazione dell'utente utilizzando nmail e password come dati
            let { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });
            //se ci sono errori, mostra un messaggio di errore
            if (error) {
                // setLoginError(true);
                setLoginState(false);
                //altrimenti mostra un messaggio di successo e reindirizza alla home dopo 2 secondi
            } else {
                // setLoginError(false);
                setLoginState(true);
            }
        }
    }

    const onBlur = (property) => () => {
        //viene richiamata la funzione per ottenere gli errori
        const message = getFieldErrorLogin(FormSchemaLogin, property, formState[property]);
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
            <h1 className="text-3xl text-blue-600 font-semibold mb-5">Login</h1>

            {loginState === false &&
                <Message
                    message="Email o password errati, riprova per favore!"
                    esito={loginState}
                    redirectState={loginState}
                    setState={setLoginState} />
            }

            {loginState === true &&
                <Message
                    message="Login effettuato con successo, a breve verrai reindirizzato alla homepage!"
                    esito={loginState}
                    redirectState={loginState}
                    redirect="/" />
            }
            <div className="flex items-center justify-center p-4 ">
                <div className="w-full max-w-4/5 ">
                    <form
                        onSubmit={onSubmit}
                        className="p-10 rounded-xl shadow-md bg-blue-50">
                        {/* {
                            loginError &&
                                <div className="flex px-2 justify-between mb-4 py-2 bg-red-200 rounded-md text-center text-red-800 font-bold text-xl ">
                                    Indirizzo email o password errati, riprova per favore!
                                        <button type="button" onClick={() => { setLoginError(false) }} className="mr-1 flex items-top cursor-pointer float-right"><X size={20} />
                                        </button>
                                </div>
                        } */}
                        {/* Email */}
                        <div className="mb-4">
                            <InputFormRegistration
                                onChangeFunction={setField("email")}
                                onBlurFunction={onBlur("email")}
                                ariaInvalidFunction={isInvalid("email")}
                                label="Email"
                                value={formState.email}
                                type="email"
                                formErrors={formErrors}
                                id="email" />
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
                            Accedi
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}