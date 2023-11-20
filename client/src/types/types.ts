export type Rooms = {
    [key: string]: RoomObj;
}

export type RoomObj = {
    users: UserObj[];
    isGameStart: boolean;
    turnIndex: number;
}

export type Users = {
    [key: string]: UserObj;
};

export type UserObj = {
    userId: string;
    roomId: string;
    name: string;
    isHost: boolean;
    hands: Card[];
}

export type Deck = Array<Card>;

export type Card = {
    id: string;
    type: string;
    name: string;
    effect: string;
    url: string;
}

// コンポーネントProps
export type GboxProps = {
    w?: string;
    h?: string;
    justify?: string;
    align?: string;
    children?: React.ReactNode;
}

export type BtnProps = {
    w?: string;
    maxW?: string;
    bg?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    icon?: string;
    mt?: string;
    mb?: string;
    mr?: string;
    ml?: string;
    children?: React.ReactNode;
}

export type HeaderProps = {
    joinedUsers: number;
}

export type UserInfoProps = {
    users: UserObj[];
}

export type YourInfoProps = {
    users: UserObj[];
}

export type JoinRoomProps = {
    createFlg: boolean;
    nameError : string;
    createRoom?: () => void;
    joinRoom?: () => void;
    setUserName: (e: string) => void;
}

