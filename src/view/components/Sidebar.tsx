import React, { useContext, useState } from "react";
import { tempServer, tempServer_dup } from "./TempData";
import { SideIconProps, SideBarProps } from "./interfaces";
import AppContext from "./AppContext";
import KeyGenerator from "../../model/KeyGenerator";
import GlobalStateContext from "./GlobalStateContext";

const Sidebar = (props: SideBarProps) => {
    const [isSelected, setIsSelected] = useState(0);

    const elements = props.serverList.map((server, index) => {
        return (
            <SideIcon
                key={KeyGenerator.getInstance().getNewKey()}
                index={index}
                image={server.image}
                server={server}
                tooltip={server.name}
                isSelectedState={isSelected}
                setSelectedState={setIsSelected}
            />
        );
    });

    return (
        <div
            className="z-50 left-0 h-full w-20 bg-gray-900 text-white shadow-lg
                        md:flex flex-col flex-shrink-0 space-y-4 p-3"
        >
            {elements}
        </div>
    );
};

const SideIcon = (props: SideIconProps) => {
    const { server, setServer} = useContext(AppContext);
    const globalStateContext = useContext(GlobalStateContext);
    return (
        <div className="relative flex items-center justify-center group">
            <a
                onClick={() => {
                    setServer(props.server);
                    globalStateContext.setSelectedChannel("0-0")
                    props.setSelectedState(props.index);
                }}
            >
                <div
                    className={`absolute left-0 ml-[-16px] rounded-md w-2 bg-white
                                transition-all duration-200 scale-0 origin-left
                                group-hover:scale-100 ${
                                    props.isSelectedState === props.index
                                        ? "h-5/6 mt-1 scale-100"
                                        : "h-3/6 mt-3"
                                }`}
                ></div>
                <img
                    className={`h-12 w-12 
                            ${
                                props.isSelectedState === props.index
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
                         transition-all duration-200 scale-0 origin-left
                         group-hover:scale-100"
            >
                {props.tooltip}
            </span>
        </div>
    );
};

export default Sidebar;
