import KeyGenerator from "../../../model/KeyGenerator";
import { TagConverter } from "../../../model/Interfaces";
import Italics from "../../atomicComponents/Italics";

class ItalicsConverter implements TagConverter {
    convert(content: string): JSX.Element {
        return (
            <Italics
                key={KeyGenerator.getInstance().getNewKey()}
                content={content}
            />
        );
    }
}

export default ItalicsConverter;
