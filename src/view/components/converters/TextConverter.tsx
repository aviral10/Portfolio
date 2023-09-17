import KeyGenerator from "../../../model/KeyGenerator";
import { TagConverter } from "../../../model/interfaces";

class TextConverter implements TagConverter {
    convert(content: string): JSX.Element {
        return (
            <span key={KeyGenerator.getInstance().getNewKey()}>{content}</span>
        );
    }
}

export default TextConverter;