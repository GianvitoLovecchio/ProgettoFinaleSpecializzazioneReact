import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { ChevronsDown } from "lucide-react";
import { Link } from "react-router";

export default function GenresDropdown() {
    const { data, error, load } = useFetch("https://api.rawg.io/api/genres?key=25026496f67e4b888b43a18359248003");

    return (
        <>
            <details className="p-1 rounded group">
                <summary className="flex list-none cursor-pointer text-blue-600 font-bold text-2xl">
                    Generi
                    <span>
                        <ChevronsDown size={22} strokeWidth={3} className="text-red-700 mt-1.5 ml-2 transition duration-500 group-open:rotate-180" />
                    </span>
                </summary>


                {error && <small>{error}</small>}
                <ul>
                    {data?.results.map((genre) => (
                        <li className="ml-2 text-blue-600 font-semibold text-md my-1" key={genre.id}>
                            <Link to={ `/games/${genre.slug}`}> {genre.name} </Link>
                        </li>
                    ))}
                </ul>
            </details >
        </>
    )
}