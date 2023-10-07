import KeyGenerator from "../../../model/KeyGenerator";
import { TagConverter } from "../../../model/interfaces";
import Badge from "../../atomicComponents/Badge";

class BadgeConverter implements TagConverter {
    convert(content: string): JSX.Element {
        return (
            <Badge
                key={KeyGenerator.getInstance().getNewKey()}
                content={content}
            />
        );
    }
}

export default BadgeConverter;
