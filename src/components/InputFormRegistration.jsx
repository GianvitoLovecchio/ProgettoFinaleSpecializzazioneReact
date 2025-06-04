export default function InputFormRegistration({ label, type, id, onChangeFunction, onBlurFunction, ariaInvalidFunction, value, formErrors }) {
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
                value={value}
                onChange={onChangeFunction}
                onBlur={onBlurFunction}
                aria-invalid={ariaInvalidFunction}
            />
            {
                formErrors[id] ? (<small className="text-red-600">{formErrors[id]}</small>) : null
            }
        </>
    )
}