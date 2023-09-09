import { Server } from "../view/components/interfaces";

export default interface DataModel {
    getServerList(): Server[];
}
