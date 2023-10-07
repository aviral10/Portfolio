const Badge = ({ content }: { content: string }) => {
    return (
        <img
            className="max-w-[64px] max-h-[20px] rounded-sm"
            src={content}
            alt=""
        />
    );
};

export default Badge;
