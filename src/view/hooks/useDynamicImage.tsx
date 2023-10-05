import { useEffect, useState } from "react";
import placeholder_b from "../../assets/placeholder_g.gif";

const useDynamicImage = (url:string, placeholder:string=placeholder_b) => {
    const [imageUrl, setImageUrl] = useState(placeholder);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchImage = async () => {
            async function fetchImageFromUrl(response: Response){
                const blob = await response.blob();
                const objectURL = URL.createObjectURL(blob);
                setImageUrl(objectURL);
            }

            try {
                const response = await fetch(url);
                (response.ok)?fetchImageFromUrl(response):console.error("Failed to fetch image");
            } catch (error) {
                console.error("Error fetching image:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchImage();
    }, []);
    return isLoading ? placeholder : imageUrl;
};

export default useDynamicImage;
