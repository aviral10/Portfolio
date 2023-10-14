import { TagConverter } from "../../../model/Interfaces";
import BadgeConverter from "./BadgeConverter";
import BlockquoteConverter from "./BlockquoteConverter";
import BoldConverter from "./BoldConverter";
import HeadingConverter from "./HeadingConverter";
import HeadingXLConverter from "./HeadingXLConverter";
import ItalicsConverter from "./ItalicsConverter";
import LinkConverter from "./LinkConverter";
import MentionConverter from "./MentionConverter";
import OutlineConverter from "./OutlineConverter";
import SkillConverter from "./SkillConverter";
import TextConverter from "./TextConverter";

class TagFactory {
    static converterList: { [key: string]: TagConverter } = {
        mention: new MentionConverter(),
        text: new TextConverter(),
        link: new LinkConverter(),
        skill: new SkillConverter(),
        heading: new HeadingConverter(),
        headingxl: new HeadingXLConverter(),
        badge: new BadgeConverter(),
        outline: new OutlineConverter(),
        blockquote: new BlockquoteConverter(),
        b: new BoldConverter(),
        i: new ItalicsConverter(),
    };

    static defaultConverter = new TextConverter();
    
    static getConverter(tag: string): TagConverter {
        tag = tag.toLowerCase();
        return this.converterList[tag] ? this.converterList[tag] : this.defaultConverter;
    }
}

export default TagFactory;
