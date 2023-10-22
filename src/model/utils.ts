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

export const getTodaysDate = () => {
    const today = new Date();
    const date = today.getDate();
    const month = today.toLocaleString("default", {
        month: "short",
    });
    const year = today.getFullYear();
    return `${date} ${month}, ${year}`;
};

export const getISTTime = () => {
    let currentTime = new Date();
    let currentOffset = currentTime.getTimezoneOffset();
    let ISTOffset = 330; // IST offset UTC +5:30
    let ISTTime = new Date(
        currentTime.getTime() + (ISTOffset + currentOffset) * 60000
    );
    let hoursIST: string | number = ISTTime.getHours();
    let meridian = hoursIST >= 12 ? "PM" : "AM";
    hoursIST = hoursIST % 12;
    hoursIST = (hoursIST ? hoursIST : 12).toString().padStart(2, "0");
    let minutesIST = ISTTime.getMinutes().toString().padStart(2, "0");
    return [hoursIST, minutesIST, meridian];
};

export const objectIsEmpty = (object: any) => {
    for (let i in object) {
        return false;
    }
    return true;
};

export async function fetchWithTimeout(url:string, options:any = {}) {
    const timeout = options.timeout || 4000;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
        ...options,
        signal: controller.signal,
    });
    clearTimeout(id);
    return response;
}

export const smallScreen = 640;
export const mediumScreen = 768;
export const largeScreen = 1024;
export const xlScreen = 1280;
export const xxlScreen = 1536;
