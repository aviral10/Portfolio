import KeyGenerator from "../../../model/KeyGenerator";
import { TagConverter } from "../../../model/interfaces";

class BoldConverter implements TagConverter {
    convert(content: string): JSX.Element {
        return (
            <span key={KeyGenerator.getInstance().getNewKey()} className="font-bold">{content}</span>
        );
    }
}

export default BoldConverter;