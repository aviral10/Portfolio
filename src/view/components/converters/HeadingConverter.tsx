import KeyGenerator from "../../../model/KeyGenerator";
import { TagConverter } from "../../../model/interfaces";

class HeadingConverter implements TagConverter{
    convert(content: string): JSX.Element {
        return (
            <span key={KeyGenerator.getInstance().getNewKey()} className="font-medium">{content}</span>
        );
    }

}

export default HeadingConverter