import z from "zod";

//definizione criteri per la password e definizione errore
const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;

const passwordError = "La password deve contenere almeno una lettera maiuscola, una lettera minuscola ed un numero.";

//definizione schema con criteri per ogni colonna
export const FormSchema = z.object({
    email: z.string().email("Inserire un indirizzo email valido").min(1, "L'email é obbligatoria"),
    password: z.string().min(1, "La password è obbligatoria").min(8, "La password deve contenere almeno 8 caratteri").regex(passwordRegex, passwordError),
    lastName: z.string().min(1, "Il cognome è obbligatorio"),
    firstName: z.string().min(1, "Il nome è obbligatorio"),
    username: z.string().min(1, "Lo username è obbligatorio").min(3, "Lo username deve contenere almeno 3 caratteri"),
    phone: z.string()
        .min(1, "Il numero di telefono è obbligatorio")
        .min(9, "Il numero di telefono deve contenere almeno 9 cifre")
        .max(12, "Il numero di telefono deve contenere massimo 12 cifre")
        .regex(/^\d+$/, "Il numero di telefono deve contenere solo cifre")
});

export const FormSchemaLogin = z.object({
 email: z.string().email("Inserire un indirizzo email valido"),
  password: z.string().min(1,"Inserire la password"),
});


//funzione di refine che in questo caso non importa nulla
export const ConfirmSchema = FormSchema.refine((data) => data);

export const ConfirmSchemaLogin = FormSchemaLogin.refine((data) => data);

//validazione a campo singolo
export function getFieldError(property, value) {
    //accede al singolo campo provando a validarlo secondo le regole che gli sono state passate, se non è valido restituisce l'errore
    const { error } = FormSchema.shape[property].safeParse(value);
    //se c'è un errore restituisce gli errori concatenandoli in una stringa separata da "," , altrimenti restituisce undefined
    return error
        ? error.issues.map((issue) => issue.message).join(", ")
        : undefined;
}

export function getFieldErrorLogin(schema, property, value) {
    const { error } = schema.shape[property].safeParse(value);
    return error
        ? error.issues.map((issue) => issue.message).join(", ")
        : undefined;
}

//validazione di tutto l'oggetto
//viene utilizzato l'error dato come return dalla funzione getFieldError, se non c'è nessun errore restituisce undefined
export const getErrors = (error) => {
    if (!error?.issues) return {};

    return error.issues.reduce((acc, issue) => {
        const path = issue.path.join("");
        const current = acc[path];
        acc[path] = current ? `${current}, ${issue.message}` : issue.message;
        return acc;
    }, {});
};
