import ControlPanel from "./ControlPanel"
export default function TopLayout({ param, gameCount, cardLayout, setCardLayout, title }) {
    return (
        <>
            <div className="flex justify-between">
                <div className="w-full">
                    <h1 className="md:text-3xl text-lg text-blue-600 font-semibold mb-1">
                        {title}: <span className="font-bold px-0.5">{param}</span>
                    </h1>
                    <p className="text-md text-blue-600 font-normal mb-5">
                        Giochi trovati: <span className="font-semibold">{gameCount}</span>
                    </p>
                </div>
            </div>
            <ControlPanel cardLayout={cardLayout} setCardLayout={setCardLayout}></ControlPanel>
        </>
    )
}