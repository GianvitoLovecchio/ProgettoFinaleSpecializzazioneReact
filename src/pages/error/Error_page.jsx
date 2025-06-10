import { Link } from "react-router";

export default function Error_page() {
    return (
        <div>
            <h1 className='m-8 text-center text-blue-400 font-bold text-4xl'>Page not found</h1>
            <Link to="/" end>
            <button className="bg-blue-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded block mx-auto my-10 cursor-pointer">HomePage</button>
            </Link>
        </div>
    );
}