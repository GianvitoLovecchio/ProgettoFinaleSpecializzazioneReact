import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <form className="transition-all mx-10 duration-1500 focus-within:w-full focus-within:mx-25">
            <fieldset className="hidden md:flex justify-between px-3 border rounded-2xl" role="group">
                <input className="focus:outline-none px-5 w-full" type="text" />
                <button className=" p-1" type="submit"><Search /></button>
            </fieldset>
        </form>
    )
}