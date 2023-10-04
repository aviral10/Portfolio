export const splitIds = (selectedChannel: string) => {
    return selectedChannel.split("-").map((val) => +val);
}

export const smallScreen = 640
export const mediumScreen = 768
export const largeScreen = 1024
export const xlScreen = 1280
export const xxlScreen = 1536
