import { Search } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function SearchBar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [ariaInvalid, setAriaInvalid] = useState(null); // fix typo (INvalid → Invalid)

    const handleSearch = (e) => {
        e.preventDefault();
        if (typeof search === "string" && search.trim().length !== 0) {
            navigate(`/search?query=${search}`);
            setSearch("");
            setAriaInvalid(false);
        } else {
            setAriaInvalid(true);
        }
    };

    return (
        <form onSubmit={handleSearch} className="block mx-auto px-2 md:px-4">
            <fieldset
                className="flex justify-between items-center px-3 border-2 border-blue-600 rounded-2xl 
                focus-within:border-blue-600 md:transition-all md:duration-800 
                w-full md:w-64 md:focus-within:w-[32rem]"
                role="group"
            >
                <input
                    className="focus:outline-none px-3 py-2 w-full bg-transparent placeholder-gray-400 text-sm"
                    placeholder="Cerca..."
                    type="text"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-invalid={ariaInvalid}
                />
                <button
                    className="text-red-600 font-bold p-1 cursor-pointer"
                    type="submit"
                    aria-label="Cerca"
                >
                    <Search />
                </button>
            </fieldset>
        </form>
    );
}
