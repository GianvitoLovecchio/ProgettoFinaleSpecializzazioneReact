import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { ChevronsDown, Gamepad2 } from "lucide-react";
import { Link } from "react-router";

export default function GenresDropdown() {
    const { data, error, load } = useFetch("https://api.rawg.io/api/genres?key=b7b1b42400a549ada462bed213a5844a");

    return (
        <>
            <details className="rounded group">
                <summary className="flex list-none cursor-pointer text-blue-600 font-bold text-2xl">
                    <Gamepad2 strokeWidth={2} className="flex my-auto mx-2" />
                    Generi
                    <span>
                        <ChevronsDown size={22} strokeWidth={3} className="text-red-700 mt-1.5 ml-2 transition duration-500 group-open:rotate-180" />
                    </span>
                </summary>


                {error && <small>{error}</small>}
                <ul className="py-2">
                    {data?.results.map((genre) => (
                        <li className="ml-2 text-md font-semibold text-blue-600 hover:text-lg hover:font-bold py-1" key={genre.id}>
                            <Link to={ `/games/${genre.slug}`}> {genre.name} </Link>
                        </li>
                    ))}
                </ul>
            </details >
        </>
    )
}