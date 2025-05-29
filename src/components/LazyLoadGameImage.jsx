import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function LazyLoadGameImage({ image }) {

    return (
        <LazyLoadImage
            src={image}
            alt="game"
            effect="blur"
            wrapperProps={{
                style: { transition: "1s" }
            }}
        />
    )
}