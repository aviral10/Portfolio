import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { HiOutlineMail, HiOutlineOfficeBuilding } from "react-icons/hi";
import { GoCloudOffline } from "react-icons/go";
import AppContext from "./AppContext";
import backupConfig from "../../model/fallbackConfig.json";
import DataModelJson from "../../model/DataModelJson";
import Cat_8 from "../../assets/cat_8.gif"
import Cat_9 from "../../assets/cat_9.gif"
import { StatusBox } from "../../model/interfaces";


const MyProfile = () => {
    const model = new DataModelJson(backupConfig);
    const myProfile = model.getMyProfile();
    const { server, setServer } = useContext(AppContext);
    return (
        <div className="hidden p-4 h-full md:flex flex-col md:w-[25%] flex-shrink-0 bg-gray-800 text-white shadow-lg">
            <div className="w-full">
                <img className="z-40 absolute w-24 -translate-y-10 -translate-x-4 hover:scale-110" src={Cat_8} alt="" />
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



const getISTTime = () => {
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
    return [hoursIST, minutesIST, meridian]
}

const DynamicClock = ()=>{
    let [hoursIST, minutesIST, meridian] = getISTTime()
    const [currTime, setCurrTime] = useState({
        hours: hoursIST,
        minutes: minutesIST,
        meridian: meridian
    })

    useEffect(() => {
        const intervalId = setInterval(() => {
        let [hoursIST, minutesIST, meridian] = getISTTime()
        setCurrTime({
            hours: hoursIST,
            minutes: minutesIST,
            meridian: meridian
          })
        }, 10000)
    
        return () => clearInterval(intervalId);
      }, [])

    return (
        <span>{`${currTime.hours}:${currTime.minutes} ${meridian} IST local time`}</span>
    )
}
const StatusBox = (props: StatusBox) => {
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
                    <HiOutlineOfficeBuilding />
                </div>
                <div className="flex items-center h-8 w-8">
                    <HiOutlineMail />
                </div>
            </div>
            <div className="flex flex-col w-full text-xs md:text-base ">
                <div className="flex items-center h-8">{props.status}</div>
                <div className="flex items-center h-8 min-w-[200px]">{<DynamicClock/>}</div>
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
