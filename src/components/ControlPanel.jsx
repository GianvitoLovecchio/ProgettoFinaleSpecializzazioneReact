import { LayoutGrid, Columns3, ChevronDown, ChevronUp } from 'lucide-react';
import { Listbox } from '@headlessui/react';
import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

export default function ControlPanel({ cardLayout, setCardLayout }) {
    const { sort, setSort, options } = useContext(GlobalContext);

    return (
        <div className="flex justify-between w-full my-2 md:mb-4 md:mt-0 md:mr-4">
            <div className='md:mx-2 w-[55vw] md:w-[25vw]'>
                <Listbox value={sort} onChange={setSort}>
                    {({ open }) => ( // 👈 Ecco il trucco: "open" lo prendi qui!
                        <div className="relative">
                            <Listbox.Button className="cursor-pointer flex w-auto justify-between items-center text-blue-500 border-2 border-blue-500 mb-1 rounded-lg md:pl-3 pl-1 pr-1 py-0.5 md:ml-3 focus:outline-none">
                                <span className="flex items-center md:text-lg text-sm font-bold">
                                    {sort === "" ? "Ordina per..." : options.find(option => option.value === sort).title}
                                </span>
                                {open ? (
                                    <ChevronUp size={25} strokeWidth={3} className='mx-3 mb-1' />
                                ) : (
                                    <ChevronDown size={25} strokeWidth={3} className='mx-3 mt-1' />
                                )}
                            </Listbox.Button>
                            <Listbox.Options className="absolute z-50 ml-3 mt-1 w-auto overflow-auto rounded-md bg-blue-50  text-base border-2 shadow-2xl border-blue-500 focus:outline-none sm:text-sm">
                                {options.map((option, index) => (
                                    <Listbox.Option
                                        key={index}
                                        value={option.value}
                                        className={({ active }) =>
                                            `cursor-pointer py-1 pl-4 pr-4 font-semibold ${active ? 'bg-blue-500 text-white' :'text-blue-500'
                                            }`
                                        }
                                    >
                                        {option.title}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </div>
                    )}
                </Listbox>
            </div>

            <div className='flex gap-2 md:mx-2 md:mr-5 text-blue-500'>
                <LayoutGrid onClick={() => setCardLayout(!cardLayout)} size={`${cardLayout ? '40' : '30'}`} strokeWidth={`${cardLayout ? '2' : '1.5'}`} className={`cursor-pointer ${cardLayout ? '' : 'md:hover:scale-125 duration-400 mt-1'}`} />
                <Columns3 onClick={() => setCardLayout(!cardLayout)} size={`${cardLayout ? '30' : '40'}`} strokeWidth={`${cardLayout ? '1.5' : '2'}`} className={`cursor-pointer rotate-90 ${cardLayout ? 'md:hover:scale-125 duration-400 mt-1' : ''}`} />
            </div>
        </div>
    );
}
