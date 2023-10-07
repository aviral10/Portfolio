export default class FetchRemoteConfig {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    public async fetchRemoteData() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) {
                return [];
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return {};
        }
    }
}
