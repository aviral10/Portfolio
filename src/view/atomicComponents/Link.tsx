import Analytics from "../../model/Analytics/Analytics";

const Link = ({ link, title, noUnderline=false }: { link: string; title: string; noUnderline?: boolean }) => {
    return (
        <span
            className={`text-blue-400 ${noUnderline?null:"underline"}`}
        >
            <a href={link} target="_blank" onClick={()=>{Analytics.sendLinkClick(link, title)}}>
                {title}
            </a>
        </span>
    );
};

export default Link;
