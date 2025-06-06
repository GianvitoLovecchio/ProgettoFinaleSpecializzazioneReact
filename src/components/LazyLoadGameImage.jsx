import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function LazyLoadGameImage({ image, detail }) {
      const containerClass = detail
        ? "w-full my-2 overflow-hidden h-55 md:hover:scale-122 md:duration-500" 
        : "w-full my-2 overflow-hidden max-h-40";
      const imgLazyClass = detail
        ? "h-full object-fill mx-auto" 
        : "w-full object-cover";

    return (
         <div className={containerClass}>
            <LazyLoadImage
                src={image}
                alt="game"
                effect="blur"
                className={imgLazyClass}
                wrapperProps={{
                    style: { transition: "1s" }
                }}
            />
        </div>
    )
}