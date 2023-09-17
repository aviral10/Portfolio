import { AiOutlineSend } from "react-icons/ai";

const InputComponent = ({ onKeyDown }: { onKeyDown: (event: any) => void }) => {
    return (
        <div className="bottom-0 flex h-16 w-full ">
            <div className="flex bg-gray-650 w-full h-10 m-4 mt-0 p-2 rounded-xl">
                <div className="w-4"></div>
                <input
                    className="w-full bg-gray-650 focus:outline-none placeholder-gray-500"
                    type="text"
                    placeholder="Enter Text"
                    onKeyDown={onKeyDown}
                />
                <div className="right-0 flex items-center justify-center cursor-pointer">
                    <AiOutlineSend />
                </div>
            </div>
        </div>
    );
};

export default InputComponent