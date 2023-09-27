import { useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";

const InputComponent = ({ onSend }: { onSend: (event: any) => void }) => {
    const inputRef = useRef<any>(null);
    return (
        <div className="bottom-0 flex h-16 w-full ">
            <div className="flex bg-gray-650 w-full h-10 m-4 mt-0 p-2 rounded-xl">
                <div className="w-4"></div>
                <input
                    ref={inputRef}
                    className="w-full bg-gray-650 focus:outline-none placeholder-gray-500"
                    type="text"
                    placeholder="Enter Text"
                    onKeyDown={(e) => {
                        e.key === "Enter"
                            ? inputRef.current.value === ""
                                ? null
                                : onSend(inputRef.current)
                            : null;
                    }}
                />
                <div className="right-0 flex items-center justify-center cursor-pointer">
                    <AiOutlineSend
                        onClick={(e) => {
                            inputRef.current.value === ""
                                ? null
                                : onSend(inputRef.current);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default InputComponent;
