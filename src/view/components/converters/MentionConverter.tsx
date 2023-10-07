import IdStore from "../../../model/IdStore";
import KeyGenerator from "../../../model/KeyGenerator";
import { TagConverter } from "../../../model/interfaces";
import Mention from "../../atomicComponents/Mention";

class MentionConverter implements TagConverter {
    convert(content: string): JSX.Element {
        return (
            <Mention
                key={KeyGenerator.getInstance().getNewKey()}
                content={content}
                selectedChannel={IdStore.getInstance().getIdOf(content)}
            />
        );
    }
}

export default MentionConverter;
