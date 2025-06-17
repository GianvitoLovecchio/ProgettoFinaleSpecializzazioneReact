import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function LazyLoadGameImage({ image }) {

    return (

        
                 <div className="relative md:w-[150px] md:h-[70px] w-[100px] h-[9.25vh] overflow-hidden rounded-tl-xl rounded-bl-xl">
            <LazyLoadImage
                src={image}
                alt="game"
                effect="blur"
                className="w-full h-full object-cover"
                wrapperProps={{
                    style: { transition: "1s" }
                }}
            />
        </div>
            

    )

}