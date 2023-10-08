export default class FetchRemoteConfig {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    public async fetchRemoteData() {
        try {
            const response = await fetch(this.url);
            return !response.ok ? {} : await response.json();
        } catch (error) {
            console.error("Error fetching data:", error);
            return {};
        }
    }
}
