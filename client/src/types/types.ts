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

