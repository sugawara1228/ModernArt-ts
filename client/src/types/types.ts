export type Rooms = {
    [key: string]: RoomObj;
}

export type RoomObj = {
    users: string[];
    turnIndex: number;
}

export type Users = UserObj[];

export type UserObj = {
    userId: string;
    roomId: string;
    name: string;
}

// コンポーネント
export type GboxProps = {
    w?: string;
    h?: string;
    justifyContent?: string;
    children?: React.ReactNode;
}

export type BtnProps = {
    w?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    children?: React.ReactNode;
}

export type HeaderProps = {
    joinedUsers: number;
    leaveRoom: () => void;
    addPath: string;
}

export type ChatAreaProps = {
    roomId: string;
    messageList: string[];
    sendMessage: () => void;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    inputRef: React.MutableRefObject<HTMLInputElement | null>;
}
