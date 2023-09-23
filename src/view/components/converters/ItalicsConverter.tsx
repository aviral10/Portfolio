import KeyGenerator from "../../../model/KeyGenerator";
import { TagConverter } from "../../../model/interfaces";

class ItalicsConverter implements TagConverter {
    convert(content: string): JSX.Element {
        return (
            <span key={KeyGenerator.getInstance().getNewKey()} className="italic">{content}</span>
        );
    }
}

export default ItalicsConverter;