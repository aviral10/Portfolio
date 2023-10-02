import KeyGenerator from "../../../model/KeyGenerator";
import { TagConverter } from "../../../model/interfaces";

class OutlineConverter implements TagConverter {
    convert(content: string): JSX.Element {
        return (
            <span key={KeyGenerator.getInstance().getNewKey()} className="rounded-2xl pl-2 pr-2 bg-cyan-500 opacity-90 text-xs md:text-sm">{content}</span>
        );
    }
}

export default OutlineConverter;