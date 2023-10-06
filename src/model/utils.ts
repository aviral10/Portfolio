export const splitIds = (selectedChannel: string) => {
    return selectedChannel.split("-").map((val) => +val);
};

export const blobToBase64 = (blob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
        reader.onloadend = () => {
            resolve(reader.result);
        };
    });
};

export const smallScreen = 640;
export const mediumScreen = 768;
export const largeScreen = 1024;
export const xlScreen = 1280;
export const xxlScreen = 1536;
