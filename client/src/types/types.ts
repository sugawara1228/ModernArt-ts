export type Rooms = {
    [key: string]: RoomObj;
}

export type RoomObj = {
    users: UserObj[];
    turnIndex: number;
}

export type Users = {
    [key: string]: UserObj;
};

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
    sendMessage: (event: React.FormEvent<HTMLFormElement>) => void;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    inputRef: React.MutableRefObject<HTMLInputElement | null>;
    chatAreaRef: React.MutableRefObject<HTMLInputElement | null>;
}

export type UserInfoProps = {
    users: UserObj[];
}

export type JoinRoomProps = {
    createFlg: boolean;
    nameError : string;
    createRoom?: () => void;
    joinRoom?: () => void;
    setUserName: (e: string) => void;
}
