import KeyGenerator from "../../../model/KeyGenerator";
import { TagConverter } from "../../../model/Interfaces";
import Outline from "../../atomicComponents/Outline";

class OutlineConverter implements TagConverter {
    convert(content: string): JSX.Element {
        return (
            <Outline
                key={KeyGenerator.getInstance().getNewKey()}
                content={content}
            />
        );
    }
}

export default OutlineConverter;
