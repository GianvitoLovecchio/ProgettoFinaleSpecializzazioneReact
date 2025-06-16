import { LayoutGrid, Columns3 } from 'lucide-react';

export default function ControlPanel({cardLayout, setCardLayout}) {
    
    return (
        <div className="flex justify-end w-full my-2 md:mr-4">
            <div className='flex gap-2 md:mx-2 text-blue-500'>
                <LayoutGrid onClick={() => setCardLayout(!cardLayout)} size={`${cardLayout ? '40' : '30'}`} strokeWidth={`${cardLayout ? '2' : '1.5'}`} className={`cursor-pointer ${cardLayout ? '' : 'md:hover:scale-125 duration-400 mt-1 '}`} />
                <Columns3 onClick={() => setCardLayout(!cardLayout)} size={`${cardLayout ? '30' : '40'}`} strokeWidth={`${cardLayout ? '1.5' : '2'}`} className={`cursor-pointer rotate-90 ${cardLayout ? 'md:hover:scale-125 duration-400 mt-1' : ''}`} />
            </div>
        </div>
    );
}