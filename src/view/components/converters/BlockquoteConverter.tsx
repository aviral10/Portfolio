import KeyGenerator from "../../../model/KeyGenerator";
import { TagConverter } from "../../../model/Interfaces";
import Badge from "../../atomicComponents/Badge";
import Blockquote from "../../atomicComponents/Blockquote";

class BlockquoteConverter implements TagConverter {
    convert(content: string): JSX.Element {
        return (
            <Blockquote key={KeyGenerator.getInstance().getNewKey()} content={content}/>
        );
    }
}

export default BlockquoteConverter;
