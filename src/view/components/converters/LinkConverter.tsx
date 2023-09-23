import KeyGenerator from "../../../model/KeyGenerator";
import { TagConverter } from "../../../model/interfaces";

class LinkConverter implements TagConverter {
    convert(content: string): JSX.Element {
        const [title, link] = content.split(',')
        return (
            <span key={KeyGenerator.getInstance().getNewKey()} className="text-blue-400 underline"><a href={link}>{title}</a></span>
        );
    }
}

export default LinkConverter;