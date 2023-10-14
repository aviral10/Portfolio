const Blockquote = ({ content }: { content: string }) => {
    return (
        <div className="flex space-x-3">
            <div className="w-1 bg-gray-500 rounded-md">

            </div>
            <div className="font-semibold">
                {content}
            </div>
        </div>
    );
};

export default Blockquote;
