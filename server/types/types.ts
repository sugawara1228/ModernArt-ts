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

