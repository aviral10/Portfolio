import { useEffect, useState } from "react";
import placeholder_b from "../../assets/placeholder_g.gif";
import ImageCache from "../model/ImageCache";
import { blobToBase64 } from "../model/Utils";

const useDynamicImage = (url:string, placeholder:string=placeholder_b) => {
    const [imageUrl, setImageUrl] = useState(ImageCache.get(url));
    
    imageUrl?console.log("PRESENT"):fetchImage(url, setImageUrl);

    return imageUrl ? imageUrl : placeholder;
};

const fetchImage = async (url:string, setImageUrl: (url: string)=>void) => {
    async function fetchImageFromUrl(response: Response){
        const blob = await response.blob();                
        blobToBase64(blob).then((res: any) => {
            ImageCache.set(url, res);
            setImageUrl(res);
        });
    }
    try {
        const response = await fetch(url);
        (response.ok)?fetchImageFromUrl(response):console.error("Failed to fetch image");
    } catch (error) {
        console.error("Error fetching image:", error);
    }
};

export default useDynamicImage;
