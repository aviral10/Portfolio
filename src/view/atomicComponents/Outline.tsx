const Outline = ({ content }: { content: string }) => {
    return (
        <span className="rounded-2xl pl-2 pr-2 bg-cyan-500 opacity-90 text-xs md:text-sm">
            {content}
        </span>
    );
};

export default Outline;
