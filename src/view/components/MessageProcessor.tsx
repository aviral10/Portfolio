import TagFactory from "./converters/TagFactory";

export const parseMessage = (content: string) => {
    let contents = content.split(";");
    return contents.map((content) => {
        let tag = extractTag(content)
        return TagFactory.getConverter(tag).convert(
            extractTaggedContent(tag, content)
        );
    });
};

export const extractTaggedContent = (tag: string, text: string) => {
    const pattern = new RegExp(`<${tag}>(.*?)<\/${tag}>`, "g");
    const matches = text?.match(pattern);
    const extractedContent = matches?.map((match) => {
        return match.replace(new RegExp(`<\/?${tag}>`, "g"), "");
    });
    return extractedContent ? extractedContent[0] : text;
};

export const extractTag = (text: string) => {
    const pattern = /<([^/<>]+)>/;
    const matches = text.match(pattern);
    return matches ? matches[1] : "";
};
