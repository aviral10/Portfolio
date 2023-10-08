import { useEffect, useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { HiOutlineMail, HiOutlineOfficeBuilding } from "react-icons/hi";
import { GoChecklist } from "react-icons/go";
import { GoCloudOffline } from "react-icons/go";
import DataModelJson from "../../model/DataModelJson";
import Cat_8 from "../../assets/cat_8.gif";
import { StatusBox } from "../../model/Interfaces";
import Config from "../../model/Config";
import Link from "../atomicComponents/Link";
import { getISTTime } from "../../model/Utils";

const MyProfile = () => {
    const model = new DataModelJson(Config.getConfig());
    const myProfile = model.getMyProfile();
    return (
        <div className="hidden p-4 h-full md:flex flex-col md:w-[25%] flex-shrink-0 bg-gray-800 text-white shadow-lg">
            <div className="w-full">
                <img
                    className="z-40 absolute w-24 -translate-y-10 -translate-x-4 hover:scale-110"
                    src={Cat_8}
                    alt=""
                />
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
                    feedback={myProfile.feedback}
                    feedbackLink={myProfile.feedbackLink}
                />
            </div>
        </div>
    );
};

const DynamicClock = () => {
    let [hoursIST, minutesIST, meridian] = getISTTime();
    const [currTime, setCurrTime] = useState({
        hours: hoursIST,
        minutes: minutesIST,
        meridian: meridian,
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            let [hoursIST, minutesIST, meridian] = getISTTime();
            setCurrTime({
                hours: hoursIST,
                minutes: minutesIST,
                meridian: meridian,
            });
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <span>{`${currTime.hours}:${currTime.minutes} ${meridian} IST local time`}</span>
    );
};

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
                <div className="flex items-center h-8 w-8">
                    <GoChecklist />
                </div>
            </div>
            <div className="flex flex-col w-full text-xs md:text-base ">
                <div className="flex items-center h-8">{props.status}</div>
                <div className="flex items-center h-8 min-w-[200px]">
                    {<DynamicClock />}
                </div>
                <div className="flex items-center h-8">
                    <Link
                        link={props.locationLink}
                        title={props.locationTitle}
                        noUnderline={true}
                    />
                </div>
                <div className="flex items-center h-8">
                    <Link
                        link={"mailto:" + props.email}
                        title={props.email}
                        noUnderline={true}
                    />
                </div>
                <div className="flex items-center h-8">
                    <Link
                        link={props.feedbackLink}
                        title={props.feedback}
                        noUnderline={true}
                    />
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
