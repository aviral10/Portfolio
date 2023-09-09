import { Server } from "../view/components/interfaces";
import DataConverter from "./DataConverter";
import DataModel from "./DataModel";

export default class DataModelJson implements DataModel {
    private data: any;
    constructor(jsonData: Object) {
        this.data = jsonData;
    }

    public getServerList(): Server[] {
        return this.data.servers.map((server: any) => {
            const dataConverter = new DataConverter();
            return dataConverter.convertServer(server);
        });
    }
}