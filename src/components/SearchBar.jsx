import { Search } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function SearchBar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [ariaInvalid, setAriaINvalid] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(search);
        if (typeof search === "string" && search.trim().length !== 0) {
            navigate(`/search?query=${search}`);
            setSearch("");
        } else {
            setAriaINvalid(true);
        }
    }

    return (
        <form
            onSubmit={handleSearch}
            className="mx-10"
        >
            <fieldset
                className="hidden md:flex justify-between items-center px-3 border-2 border-blue-600 rounded-2xl 
               focus-within:w-[32rem] w-64 transition-all duration-1000"
                role="group"
            >
                <input
                    className="focus:outline-none px-5 w-full"
                    placeholder="Cerca..."
                    type="text"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-invalid={ariaInvalid}
                />
                <button className="text-red-600 font-bold p-1 cursor-pointer" type="submit"><Search /></button>
            </fieldset>
        </form>
    )
}