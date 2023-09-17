import { TagConverter } from "../../../model/interfaces";

class BadgeConverter implements TagConverter{
    convert(content: string): JSX.Element {
        return (
            <img className="max-w-[64px] max-h-[16px] rounded-sm" src={content} alt="" />
        )
    }

}

export default BadgeConverter