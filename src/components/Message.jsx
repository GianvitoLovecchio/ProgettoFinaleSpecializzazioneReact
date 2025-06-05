import { X } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";



export default function Message({ message, esito, redirect, redirectState, setState }) {
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => {
        if (redirectState) {
            const timer = setTimeout(() => {
                navigate(redirect);
            }, 2500);
            return () => clearTimeout(timer); // cleanup
        }
    }, [redirect, redirectState, navigate]);

    return (<>
        {showMessage &&
            <div>
                <h1
                    className={`flex px-2 justify-between mb-4 py-2 rounded-md text-center font-bold text-xl 
                    ${esito ?
                            "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                        }`}>
                    {message}
                    <button type="button" onClick={() => { setShowMessage(false), setState(null) }} className="mr-1 flex items-top cursor-pointer float-right">
                        <X size={20} />
                    </button>
                </h1>
            </div>
        }

    </>
    )
}