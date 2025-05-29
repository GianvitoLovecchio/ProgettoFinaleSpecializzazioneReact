export default function CardGame({ game }) {
    return (
        <>
            <div key={game.id} className="m-2 p-4 border-2 border-black">
                <h1 className="h-12 font-semibold">{game.name}</h1>
                <div className="flex flex-wrap h-15 items-top">
                    {game.genres.map((genre) => (
                        <p className="h-5 text-[10px] font-light border boder-black rounded-lg bg-black text-white py-0.5 px-1 mx-1" key={genre.id}>{genre.name}</p>
                    ))}
                </div>
                <div className="flex items-center">
                    <img src={game.background_image} alt="" />
                </div>
                <div className="flex justify-end">
                    <button className="bg-black border border-black rounded-lg text-white mt-2 py-1 px-2 hover:font-bold hover:bg-gray-300 hover:text-black cursor-pointer">Scopri</button>
                </div>
            </div>
        </>
    )
}