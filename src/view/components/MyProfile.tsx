import React, { useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import {IoHome} from "react-icons/io5"
import {HiOutlineMail} from "react-icons/hi"

const MyProfile = () => {
    const image_url = "https://avatars.githubusercontent.com/u/61791180"
    const image_url2= "https://media.licdn.com/dms/image/D4D03AQHzTADPmelb0Q/profile-displayphoto-shrink_800_800/0/1670226849678?e=2147483647&v=beta&t=KF8aF5hu3Yneeu2GIgaBIdCoyQv_RnEgVVeYe2CVW2k"
    return (
        <div className="hidden p-4 h-full md:flex flex-col md:w-[25%] flex-shrink-0 bg-gray-800 text-white shadow-lg">
            <div className="w-full">
                <img className="rounded-2xl" src={image_url2} alt="PROFILE" />
            </div>
            <div>
                <p className="mt-2 text-lg lg:text-3xl">Aviral Rana</p>
                <p className="text-sm lg:text-3x">Aspiring Software Engineer</p>
                <div className="w-full h-4"></div>
                <StatusBox/>
            </div>
        </div>
    );
};

const StatusBox = ()=>{
    let currentTime = new Date();
    let currentOffset = currentTime.getTimezoneOffset();
    let ISTOffset = 330;   // IST offset UTC +5:30 
    let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    let hoursIST:string|number = ISTTime.getHours()
    let meridian = hoursIST >= 12 ? 'PM' : 'AM';
    hoursIST = (hoursIST % 12)
    hoursIST = (hoursIST ? hoursIST : 12).toString().padStart(2, '0');
    let minutesIST:string|number = ISTTime.getMinutes().toString().padStart(2, '0')

    return (
        <div className="flex flex-shrink-0">
            <div className="flex flex-col w-8">
                <div className="flex items-center h-8 w-8 ">
                    <div className="w-3 h-3 bg-green-700 rounded-3xl">
                    </div>
                </div>
                <div className="flex items-center h-8 w-8"><AiOutlineClockCircle/></div>
                <div className="flex items-center h-8 w-8"><IoHome/></div>
                <div className="flex items-center h-8 w-8"><HiOutlineMail/></div>

            </div>
            <div className="flex flex-col w-full">
                <div className="flex items-center h-8">Online</div>
                <div className="flex items-center h-8">{`${hoursIST}:${minutesIST} ${meridian} IST local time`}</div>
                <div className="flex items-center h-8"><a className="text-blue-400" href="">Noida, India</a></div>
                <div className="flex items-center h-8"><a className="text-blue-400" href="mailto:aviral19rana@gmail.com">aviral19rana@gmail.com</a></div>
            </div>
        </div>
    )
}

const Timezone = ()=>{
    return (
        <AiOutlineClockCircle/>
    )
}

const Status = ()=>{
    return (
        <div className="flex items-center space-x-4 pl-">
            <span className="w-2 h-2 bg-green-700 rounded-3xl"></span>
            <p>Online</p>
        </div>
    )
}



export default MyProfile;
