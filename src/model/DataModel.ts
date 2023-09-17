import { Server } from "./interfaces";

export default interface DataModel {
    getServerList(): Server[];
}
