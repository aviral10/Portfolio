import KeyGenerator from "../../../model/KeyGenerator";
import { TagConverter } from "../../../model/interfaces";

class HeadingXLConverter implements TagConverter{
    convert(content: string): JSX.Element {
        return (
            <span key={KeyGenerator.getInstance().getNewKey()} className="text-xl md:text-2xl">{content}</span>
        );
    }

}

export default HeadingXLConverter