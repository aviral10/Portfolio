import React, { useContext, useState } from "react";
import { tempServer, tempServer_dup } from "./TempData";
import { SideIconProps } from "./interfaces";
import AppContext from "./AppContext";

const Sidebar = () => {
    const [isSelected, setIsSelected] = useState(-1);
    let elements: any[] = [];
    elements.push(
        <SideIcon
            key={0}
            index={0}
            image={tempServer.image}
            server={tempServer}
            tooltip={tempServer.name}
            isSelectedState={[isSelected, setIsSelected]}
        />
    );
    elements.push(
        <SideIcon
            key={1}
            index={1}
            image={tempServer_dup.image}
            server={tempServer_dup}
            tooltip={tempServer_dup.name}
            isSelectedState={[isSelected, setIsSelected]}
        />
    );

    return (
        <div
            className="left-0 h-full w-20 bg-gray-900 text-white shadow-lg
                        flex flex-col flex-shrink-0 space-y-4 p-3"
        >
            {elements}
        </div>
    );
};

const SideIcon = (props: SideIconProps) => {
    const { server, setServer } = useContext(AppContext);
    return (
        <div className="relative flex items-center justify-center group">
            <a
                onClick={() => {
                    setServer(props.server);
                    props.isSelectedState[1](props.index);
                }}
            >
                <div
                    className={`absolute left-0 ml-[-16px] rounded-md w-2 bg-white
                                transition-all duration-200 scale-0 origin-left
                                group-hover:scale-100 ${
                                    props.isSelectedState[0] === props.index
                                        ? "h-5/6 mt-1 scale-100"
                                        : "h-3/6 mt-3"
                                }`}
                ></div>
                <img
                    className={`h-12 w-12 
                            ${
                                props.isSelectedState[0] === props.index
                                    ? "rounded-2xl"
                                    : "rounded-3xl"
                            }
                            hover:rounded-2xl
                            transition-all duration-200 ease-linear
                            cursor-pointer`}
                    src={props.image}
                    alt=""
                />
            </a>
            <span
                className="absolute w-auto p-2 m-2 min-w-max left-16 
                         rounded-md shadow-md
                         text-white bg-gray-900
                         text-xs font-bold
                         transition-all duration-100 scale-0 origin-left
                         group-hover:scale-100"
            >
                {props.tooltip}
            </span>
        </div>
    );
};

export default Sidebar;
