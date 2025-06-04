import { Eye, EyeOff } from "lucide-react";

export default function PasswordForm({ label, id, onChangeFunction, onBlurFunction, ariaInvalidFunction, value, formErrors, showPassword, setShowPassword }) {
    return (
        <>
            <label htmlFor={id} className="block text-gray-700 font-semibold mb-1">
                {label}
            </label>
            <div className="flex border border-gray-300 rounded-md">
                <input
                    id={id}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2  focus:outline-none"
                    name={id}
                    value={value}
                    onChange={onChangeFunction}
                    onBlur={onBlurFunction}
                    aria-invalid={ariaInvalidFunction}
                />
                <button className="flex items-center px-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)} type="button">
                    {showPassword ? (
                        <EyeOff color="#2563eb" strokeWidth={2} />
                    ) : (
                        <Eye color="#2563eb" strokeWidth={2} />
                    )}
                </button>
            </div>
            {
                formErrors[id] ? (<small className="text-red-600">{formErrors[id]}</small>) : null
            }
        </>
    )
}