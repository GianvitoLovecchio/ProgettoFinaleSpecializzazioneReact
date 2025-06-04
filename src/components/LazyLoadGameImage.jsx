import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function LazyLoadGameImage({ image }) {

    return (
        <div className="w-full my-2 overflow-hidden">
            <LazyLoadImage
                src={image}
                alt="game"
                effect="blur"
                className="w-full object-cover"
                wrapperProps={{
                    style: { transition: "1s" }
                }}
            />
        </div>
    )
}