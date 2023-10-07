import KeyGenerator from "../../../model/KeyGenerator";
import { TagConverter } from "../../../model/interfaces";
import Link from "../../atomicComponents/Link";

class LinkConverter implements TagConverter {
    convert(content: string): JSX.Element {
        const [title, link] = content.split(',')
        return <Link key={KeyGenerator.getInstance().getNewKey()} link={link} title={title}/>
    }
}

export default LinkConverter;