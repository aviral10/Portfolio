import { TagConverter } from "../../../model/interfaces";
import BadgeConverter from "./BadgeConverter";
import HeadingConverter from "./HeadingConverter";
import LinkConverter from "./LinkConverter";
import MentionConverter from "./MentionConverter";
import SkillConverter from "./SkillConverter";
import TextConverter from "./TextConverter";

class TagFactory {
    static converterList: { [key: string]: TagConverter } = {
        "mention": new MentionConverter(),
        "text": new TextConverter(),
        "link": new LinkConverter(),
        "skill": new SkillConverter(),
        "heading": new HeadingConverter(),
        "badge": new BadgeConverter()
    };
    static defaultConverter = new TextConverter()
    static getConverter(tag: string): TagConverter {
        tag = tag.toLowerCase()
        return this.converterList[tag]?this.converterList[tag]:this.defaultConverter;
    }
}

export default TagFactory;
