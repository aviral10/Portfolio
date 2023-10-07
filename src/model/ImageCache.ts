import { Server } from "./Interfaces";

class ImageCache {
    private static cache: Map<string, string> = new Map();

    public static get(key: string) {
        let present = this.cache.get(key);
        return present ? present : key;
    }

    public static set(key: string, value: string) {
        this.cache.set(key, value);
    }

    public static reset() {
        this.cache = new Map();
    }

    private static async fetchImage(url: string) {
        const fetchImageFromUrl = async (response: Response) => {
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        };
        let image = url;
        try {
            const response = await fetch(url);
            image = response.ok ? await fetchImageFromUrl(response) : url;
        } catch (error) {
            image = url;
        }
        return image;
    }

    public static async setAsync(key: string, value: Promise<string>) {
        value.then((resolvedVal) => this.cache.set(key, resolvedVal));
    }

    public static async prefetch(serverList: Server[]) {
        serverList.map((server) => [
            server.channelGroups.map((channelGroup) => [
                channelGroup.channelItems.map((channelItem) => {
                    channelItem.messageGroups.map((messageGroup) => {
                        messageGroup.messages.map((message) => {
                            let imageUrl = message.image
                                ? message.image === "IMAGE_URL"
                                    ? null
                                    : message.image
                                : null;
                            imageUrl
                                ? this.setAsync(
                                      message.image,
                                      this.fetchImage(message.image)
                                  )
                                : null;
                        });
                    });
                }),
            ]),
        ]);
    }

    public static getCache() {
        return this.cache;
    }
}

export default ImageCache;
