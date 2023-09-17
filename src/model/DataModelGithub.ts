import { Server } from "./interfaces";
import DataConverter from "./DataConverter";
import DataModel from "./DataModel";
export default class DataModelGithub implements DataModel {
    private gistId: string;
    private fileName: string;
    private url = "https://api.github.com/gists/";

    constructor(gistId: string, fileName: string) {
        this.gistId = gistId;
        this.fileName = fileName;
    }

    private async fetchServerList() {
        let data = await fetch(this.url + this.gistId)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                return JSON.parse(data.files[this.fileName].content);
            });
        return data;
    }

    public getServerList(): Server[] {
        let data = this.fetchServerList() as any;
        return data.servers.map((server: any) => {
            const dataConverter = new DataConverter();
            return dataConverter.convertServer(server);
        });
    }
}
