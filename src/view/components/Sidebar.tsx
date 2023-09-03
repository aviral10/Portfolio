import React from "react"

const Sidebar = () => {
    let temp = "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww&w=1000&q=80"
    let elements:any[] = []
    for(let i=0;i<5;i++){
        elements.push(<SideIcon key={i} image={temp} tooltip="Sample"/>)
    }    
    return (
        <div className="left-0 h-full w-20 bg-gray-900 text-white shadow-lg
                        flex flex-col flex-shrink-0 space-y-4 p-3">
        
        {elements}

        </div>
    )
}

interface SideIconProps{
    image: string
    tooltip: string
}

function doSom(){
    console.log("PPPP")
}

const SideIcon = (props:SideIconProps) => {
    return (
    <div className="relative flex items-center justify-center group">
        <a onClick={() => doSom()}>
            <img className="h-12 w-12 
                            rounded-3xl hover:rounded-2xl
                            transition-all duration-200 ease-linear
                            cursor-pointer" 
            src={props.image} alt="" />
        </a>
        <span className="absolute w-auto p-2 m-2 min-w-max left-16 
                         rounded-md shadow-md
                         text-white bg-gray-900
                         text-xs font-bold
                         transition-all duration-100 scale-0 origin-left
                         group-hover:scale-100">
        {props.tooltip}</span>    
    </div>
    )
}

export default Sidebar