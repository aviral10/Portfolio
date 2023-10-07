import KeyGenerator from "../../../model/KeyGenerator";
import { TagConverter } from "../../../model/Interfaces";
import HeadingXL from "../../atomicComponents/HeadingXL";

class HeadingXLConverter implements TagConverter {
    convert(content: string): JSX.Element {
        return (
            <HeadingXL
                key={KeyGenerator.getInstance().getNewKey()}
                content={content}
            />
        );
    }
}

export default HeadingXLConverter;
