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
    isHost: boolean;
}