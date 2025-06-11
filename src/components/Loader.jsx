import { PuffLoader } from "react-spinners";
export default function Loader() {
    return (
        <div className={`flex justify-center items-center h-[70vh]`} >
            <PuffLoader size={100} speedMultiplier={2} />
        </div>
    )
}