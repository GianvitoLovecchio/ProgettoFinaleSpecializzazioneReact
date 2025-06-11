import { readonly } from "zod/v4"


export default function InputFormUpdate({ label, type, id, onChangeFunction, valor, noEdit }) {
    // const { session } = useContext(SessionContext);
    return (
        <>
            <label htmlFor={id} className="block text-gray-700 font-semibold mb-1">
                {label}
            </label>
            <input
                id={id}
                type={type}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                name={id}
                value={valor}
                onChange={(e)=> {onChangeFunction(e.target.value)}}
                {...noEdit === true ? {readOnly: true} : {}}
            />
            {/* {
                formErrors[id] ? (<small className="text-red-600">{formErrors[id]}</small>) : null
            } */}
        </>
    )
}