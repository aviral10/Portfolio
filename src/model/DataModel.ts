import { Server } from "./Interfaces";

export default interface DataModel {
    getServerList(): Server[];
}
