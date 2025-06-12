import { SortAsc, SortDesc } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import { SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SortPanel() {
    const { sort, asc, setOrdering } = useContext(GlobalContext);
    const [ordershow, setOrderShow] = useState(false);
    const orderParams = [
        { nome: "Nome", slug: "name" },
        { nome: "Data di uscita", slug: "released" },
        { nome: "Punteggio", slug: "rating" },
        { nome: "Data di caricamento", slug: "added" }
    ];

    useEffect(() => {
        sort ? setOrderShow(true) : setOrderShow(false);
    }, [])

    return (
        <div className=""> {/* min-height per evitare salti */}
            <AnimatePresence mode="wait">
                {!ordershow && (
                    <motion.div
                        key="closed"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="aw-full flex justify-center"
                    >
                        <div className="flex justify-between items-center bg-blue-50 w-full mb-8 mx-3 py-4 px-4 rounded-xl shadow-md gap-3 md:w-1/3 md:h-[70px]">
                            <h2 className="text-lg sm:text-xl font-bold text-blue-600 mr-0 sm:mr-4 sm:text-left">
                                Ordina i giochi
                            </h2>
                            <SlidersHorizontal
                                onClick={() => setOrderShow(true)}
                                className="text-blue-500 md:hover:blue-700 cursor-pointer"
                                strokeWidth={3}
                            />
                        </div>
                    </motion.div>
                )}

                {ordershow && (
                    <motion.div
                        key="open"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="md:w-full mx-2 flex justify-center"
                    >
                        <div className="flex flex-wrap justify-center sm:justify-start items-center bg-blue-50 mx-2 mb-8 py-4 pb-5 px-4 sm:px-8 rounded-xl shadow-md gap-3 w-full max-w-4xl md:h-[70px]">

                            <h2 className="hidden md:flex text-lg sm:text-xl font-bold text-blue-600 mr-0 sm:mr-4 w-full sm:w-auto text-center sm:text-left">
                                Ordina per:
                            </h2>

                            <div className='md:hidden block w-full'>
                                <div className="flex">
                                    <h2 className="text-lg sm:text-xl font-bold text-blue-600 mr-0 sm:mr-4 w-full sm:w-auto text-center sm:text-left">
                                        Ordina per:
                                    </h2>
                                    <X
                                        strokeWidth={3}
                                        size={30}
                                        className="cursor-pointer text-red-600"
                                        onClick={() => setOrderShow(false)}
                                    />
                                </div>
                            </div>

                            {orderParams.map((label, index) => (
                                <p
                                    key={index}
                                    className={`cursor-pointer px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-sm
                                        ${sort === label.slug
                                            ? "text-white bg-red-600 border border-red-600"
                                            : "text-blue-500 bg-white border border-blue-300 hover:bg-blue-500 hover:text-white"}`}
                                    onClick={() => setOrdering(label.slug, asc)}
                                >
                                    {label.nome}
                                </p>
                            ))}

                            <div className="hidden sm:block h-full bg-blue-500 w-[2px] my-1"></div>

                            <div className="flex gap-2 mt-2 sm:mt-0">
                                <button title="Ordine ascendente" onClick={() => setOrdering(sort, true)}>
                                    <SortAsc
                                        className={`cursor-pointer rounded-full w-10 sm:w-12 h-7.5 py-[1px] shadow-sm transition-colors duration-300 ease-in-out
                                            ${asc
                                                ? "text-white bg-red-600 border border-red-600"
                                                : "text-blue-500 bg-white border border-blue-300 hover:bg-blue-500 hover:text-white"}`}
                                    />
                                </button>

                                <button title="Ordine discendente" onClick={() => setOrdering(sort, false)}>
                                    <SortDesc
                                        className={`cursor-pointer rounded-full w-10 sm:w-12 h-7.5 py-[1px] shadow-sm transition-colors duration-300 ease-in-out
                                            ${!asc
                                                ? "text-white bg-red-600 border border-red-600"
                                                : "text-blue-500 bg-white border border-blue-300 hover:bg-blue-500 hover:text-white"}`}
                                    />
                                </button>
                            </div>

                            <X
                                strokeWidth={3}
                                size={30}
                                className="duration-1000 hidden ml-8 md:flex cursor-pointer text-red-600"
                                onClick={() => setOrderShow(false)}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
