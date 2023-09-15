export const splitIds = (selectedChannel: string) => {
    return selectedChannel.split("-").map((val) => +val);
}
