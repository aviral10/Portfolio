import KeyGenerator from "../../../model/KeyGenerator";
import { TagConverter } from "../../../model/interfaces";
import { extractTaggedContent } from "./MessageProcessor";
import TagFactory from "./TagFactory";

class SkillConverter implements TagConverter {
    convert(content: string): JSX.Element {
        const [item, percentageStr, profeciency, badgeTag] = content.split(",");

        const badgeLink = extractTaggedContent("badge", badgeTag);
        const badge = TagFactory.getConverter("badge").convert(badgeLink);
        let percentage = +percentageStr;
        return (
            <div
                key={KeyGenerator.getInstance().getNewKey()}
                className="p-2 italic font-medium"
            >
                <div className="flex items-center mb-2">
                    {badge}
                    <span className="text-[10px] md:text-sm w-2/3">
                        {" - " + item}
                    </span>
                    <span className="text-[10px] md:text-sm w-1/3 text-right">
                        {profeciency}
                    </span>
                </div>
                <div className="rounded-3xl bg-gray-700 w-64 md:w-96">
                    <div
                        className="h-3 bg-blue-500 text-xs font-medium text-blue-100 text-center leading-none rounded-full hover:scale-105 ease-in-out duration-300"
                        style={{ width: percentage + "%" }}
                    ></div>
                </div>
            </div>
        );
    }
}

export default SkillConverter;
