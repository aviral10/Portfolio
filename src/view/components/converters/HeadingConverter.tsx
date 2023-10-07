import KeyGenerator from "../../../model/KeyGenerator";
import { TagConverter } from "../../../model/interfaces";
import Heading from "../../atomicComponents/Heading";

class HeadingConverter implements TagConverter {
    convert(content: string): JSX.Element {
        return (
            <Heading
                key={KeyGenerator.getInstance().getNewKey()}
                content={content}
            />
        );
    }
}

export default HeadingConverter;
