import { LayoutGrid, Columns3, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function ControlPanel({ cardLayout, setCardLayout }) {
    const [sort, setSort] = useState("");
    const [openSelect, setOpenSelect] = useState(false);
    const dropdownRef = useRef(null);
    const options = [
        { title: "Nome A-Z", value: "name" },
        { title: "Nome Z-A", value: "-name" },
        { title: "Data di rilascio (più recente)", value: "-released" },
        { title: "Data di rilascio (più vecchio)", value: "released" },
        { title: "Popolarità crescente", value: "added" },
        { title: "Popolarità decrescente", value: "-added" },
        { title: "Voto metacritic crescente", value: "metacritic" },
        { title: "Voto metacritic decrescente", value: "-metacritic" },
        { title: "Voto utenti crescente", value: "rating" },
        { title: "Voto utenti decrescente", value: "-rating" },
    ];


    // Chiudi il menu se clicchi fuori
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenSelect(false);
            }
        };

        if (openSelect) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Cleanup per evitare memory leak
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openSelect]);


    return (
        <div className="flex justify-between w-full my-2 md:mb-4 md:mt-0 md:mr-4" >
            <div className='mx-2' ref={dropdownRef}>
                <div className='relative flex justify-between text-blue-500 ml-3 border-[2px] border-blue-500 mb-1 rounded-lg pl-3 pr-1 py-0.5'>
                    <h2 className='flex  items-center text-xl font-bold'>{sort === "" ? "Ordina per " : options.find(option => option.value === sort).title}</h2>
                    {openSelect ?
                        <ChevronUp className="cursor-pointer ml-25 mt-1 flex items-center" size={30} strokeWidth={2} onClick={() => setOpenSelect(!openSelect)} />
                        :
                        <ChevronDown className="cursor-pointer ml-25 mt-1 flex items-center" size={30} strokeWidth={2} onClick={() => setOpenSelect(!openSelect)} />
                    }
                </div>
                {openSelect &&
                    <div className='absolute top-33 left-82 border-2 bg-blue-50 border-blue-500 rounded-lg flex flex-col gap-2 z-100 mx-2 py-2'>
                        {options.map((option, index) => (
                            <p key={index} className='cursor-pointer px-2 md:hover:bg-blue-500 md:hover:text-white' onClick={() => { setSort(option.value); setOpenSelect(false); }}>{option.title}</p>
                        ))}
                        {/* <p className='cursor-pointer px-2 md:hover:bg-blue-500 md:hover:text-white' onClick={() => { setSort("name"); setOpenSelect(false); }}>Nome A-Z</p>
                        <p className='cursor-pointer px-2 md:hover:bg-blue-500 md:hover:text-white' onClick={() => { setSort("-name"); setOpenSelect(false); }}>Nome Z-A</p>
                        <p className='cursor-pointer px-2 md:hover:bg-blue-500 md:hover:text-white' onClick={() => { setSort("-released"); setOpenSelect(false); }}>Data di uscita - meno recenti</p>
                        <p className='cursor-pointer px-2 md:hover:bg-blue-500 md:hover:text-white' onClick={() => { setSort("released"); setOpenSelect(false); }}>Data di uscita - meno recenti</p>
                        <p className='cursor-pointer px-2 md:hover:bg-blue-500 md:hover:text-white' onClick={() => { setSort("-rating"); setOpenSelect(false); }}>Punteggio medio - dal più alto</p>
                        <p className='cursor-pointer px-2 md:hover:bg-blue-500 md:hover:text-white' onClick={() => { setSort("rating"); setOpenSelect(false); }}>Punteggio medio - dal più basso</p>
                        <p className='cursor-pointer px-2 md:hover:bg-blue-500 md:hover:text-white' onClick={() => { setSort("-added"); setOpenSelect(false); }}>Più aggiunti</p>
                        <p className='cursor-pointer px-2 md:hover:bg-blue-500 md:hover:text-white' onClick={() => { setSort("added"); setOpenSelect(false); }}>Meno aggiunti</p> */}
                    </div>
                }
            </div>
            <div className='flex gap-2 md:mx-2 text-blue-500'>
                <LayoutGrid onClick={() => setCardLayout(!cardLayout)} size={`${cardLayout ? '40' : '30'}`} strokeWidth={`${cardLayout ? '2' : '1.5'}`} className={`cursor-pointer ${cardLayout ? '' : 'md:hover:scale-125 duration-400 mt-1 '}`} />
                <Columns3 onClick={() => setCardLayout(!cardLayout)} size={`${cardLayout ? '30' : '40'}`} strokeWidth={`${cardLayout ? '1.5' : '2'}`} className={`cursor-pointer rotate-90 ${cardLayout ? 'md:hover:scale-125 duration-400 mt-1' : ''}`} />
            </div>
        </div>
    );
}