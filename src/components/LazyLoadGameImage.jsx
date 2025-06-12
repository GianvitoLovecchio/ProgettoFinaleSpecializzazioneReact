import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function LazyLoadGameImage({ image, detail }) {
      const containerClass = detail
        ? "w-full my-4 overflow-hidden md:h-55 h-35 md:hover:scale-122 md:duration-500" 
        : "w-full overflow-hidden h-40 rounded-tl-xl rounded-tr-xl ";
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