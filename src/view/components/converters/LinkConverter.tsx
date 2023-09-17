import KeyGenerator from "../../../model/KeyGenerator";
import { TagConverter } from "../../../model/interfaces";

class LinkConverter implements TagConverter {
    convert(content: string): JSX.Element {
        return (
            <span key={KeyGenerator.getInstance().getNewKey()} className="text-blue-400 underline">{content}</span>
        );
    }
}

export default LinkConverter;