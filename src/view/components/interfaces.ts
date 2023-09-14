export interface AppContext {
    server: Server;
    setServer: (server: Server) => void;
}

export interface ChannelGroup {
    name: string;
    channelItems: ChannelItem[];
    id: number;
}

export interface ChannelGroupProps {
    channelGroup: ChannelGroup;
    selectedChannel: any;
    setSelectedChannel: (selectedChannel: string) => void;
}

export interface ChannelItem {
    name: string;
    messageHeader: string[];
    messageGroups: MessageGroup[];
}

export interface ChannelItemsProps {
    items: ChannelItem[];
    parent: number;
    selectedChannel: string;
    setSelectedChannel: (selectedChannel: string) => void;
}

export interface ChannelsProps {
    selectedChannel: string;
    setSelectedChannel: (selectedChannel: string) => void;
}

export interface Hamburger {
    hamburgerClicked: boolean;
    setHamburgerClicked: (hamburgerClicked: boolean) => void;
}

export interface Message {
    sender: { name: string; icon: string };
    content: string;
    image: string;
    messageType: MessageType
}

export enum MessageType {
    DEFAULT,
    FANCY,
    RESUME
}

export interface MessageGroup {
    date: string;
    messages: Message[];
}

export interface MessagesProps {
    messageHeader: string[];
    messageGroups: MessageGroup[];
}

export interface MyProfileTab {
    image: string
    name: string
    title: string
    status: string
    locationTitle: string
    locationLink: string
    email: string
}

export interface ScrollableComponentProps {
    messageHeader: string[];
    messageGroups: MessageGroup[];
    endRef: React.MutableRefObject<any>
}

export interface SearchBarProps {
    hamburger: [any, any];
}

export interface Server {
    name: string;
    image: string;
    channelGroups: ChannelGroup[];
}

export interface SideBarProps {
    serverList: Server[];
}

export interface SideIconProps {
    index: number;
    server: Server;
    image: string;
    tooltip: string;
    isSelectedState: number;
    setSelectedState: (isSelectedState: number) => void;
}
