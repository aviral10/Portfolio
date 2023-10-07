import KeyGenerator from "../../../model/KeyGenerator";
import { TagConverter } from "../../../model/interfaces";
import Bold from "../../atomicComponents/Bold";

class BoldConverter implements TagConverter {
    convert(content: string): JSX.Element {
        return (
            <Bold
                key={KeyGenerator.getInstance().getNewKey()}
                content={content}
            />
        );
    }
}

export default BoldConverter;
