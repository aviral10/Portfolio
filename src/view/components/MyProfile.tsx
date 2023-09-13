import React, { useContext, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoHome } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { GoCloudOffline } from "react-icons/go";
import AppContext from "./AppContext";
import backupConfig from "../../model/fallbackConfig.json";
import DataModelJson from "../../model/DataModelJson";

const MyProfile = () => {
    const model = new DataModelJson(backupConfig);
    const myProfile = model.getMyProfile();
    const { server, setServer } = useContext(AppContext);
    return (
        <div className="hidden p-4 h-full md:flex flex-col md:w-[25%] flex-shrink-0 bg-gray-800 text-white shadow-lg">
            <div className="w-full">
                <img
                    className="rounded-2xl"
                    src={myProfile.image}
                    alt="PROFILE"
                />
            </div>
            <div>
                <p className="mt-2 text-lg lg:text-3xl">{myProfile.name}</p>
                <p className="text-sm lg:text-3x">{myProfile.title}</p>
                <div className="w-full h-4"></div>
                <StatusBox
                    title={myProfile.title}
                    status={myProfile.status}
                    locationTitle={myProfile.locationTitle}
                    locationLink={myProfile.locationLink}
                    email={myProfile.email}
                />
            </div>
        </div>
    );
};

export interface StatusBox {
    title: string;
    status: string;
    locationTitle: string;
    locationLink: string;
    email: string;
}

const StatusBox = (props: StatusBox) => {
    let currentTime = new Date();
    let currentOffset = currentTime.getTimezoneOffset();
    let ISTOffset = 330; // IST offset UTC +5:30
    let ISTTime = new Date(
        currentTime.getTime() + (ISTOffset + currentOffset) * 60000
    );
    let hoursIST: string | number = ISTTime.getHours();
    let meridian = hoursIST >= 12 ? "PM" : "AM";
    hoursIST = hoursIST % 12;
    hoursIST = (hoursIST ? hoursIST : 12).toString().padStart(2, "0");
    let minutesIST = ISTTime.getMinutes().toString().padStart(2, "0");

    return (
        <div className="flex flex-shrink-0">
            <div className="flex flex-col w-8">
                <div className="flex items-center h-8 w-8 ">
                    {props.status === "online" ? (
                        <OnlineStatusIcon />
                    ) : (
                        <OfflineStatusIcon />
                    )}
                </div>
                <div className="flex items-center h-8 w-8">
                    <AiOutlineClockCircle />
                </div>
                <div className="flex items-center h-8 w-8">
                    <IoHome />
                </div>
                <div className="flex items-center h-8 w-8">
                    <HiOutlineMail />
                </div>
            </div>
            <div className="flex flex-col w-full text-xs md:text-base ">
                <div className="flex items-center h-8">{props.status}</div>
                <div className="flex items-center h-8 min-w-[200px]">{`${hoursIST}:${minutesIST} ${meridian} IST local time`}</div>
                <div className="flex items-center h-8">
                    <a
                        className="text-blue-400"
                        href={props.locationLink}
                        target="_blank"
                    >
                        {props.locationTitle}
                    </a>
                </div>
                <div className="flex items-center h-8">
                    <a className="text-blue-400" href={"mailto:" + props.email}>
                        {props.email}
                    </a>
                </div>
            </div>
        </div>
    );
};

const OnlineStatusIcon = () => {
    return <div className="w-3 h-3 bg-green-700 rounded-3xl"></div>;
};
const OfflineStatusIcon = () => {
    return <GoCloudOffline />;
};

export default MyProfile;
