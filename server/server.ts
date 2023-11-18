import { Rooms, Users, UserObj } from './types/types'
import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
  pingTimeout: 1800000,
  pingInterval: 25000,
});

const rooms: Rooms = {};
const users: Users = {};

// クライアントからの接続イベントをリッスン
io.on("connection", (socket: Socket) => {
  console.log(`クライアントが接続しました。socket.id:"${socket.id}"`);

  /** ルーム作成処理 */
  socket.on("createRoom", (roomId: string, userName: string) => {

    // 以前のルーム作成・入室したときのデータを探す
    const oldUserData: UserObj | undefined = users[socket.id];

    // もし前のデータがあった場合、先にデータ削除＆ルーム退出処理を行う
    if(oldUserData) {
      console.log(`socket.id: "${socket.id}"のユーザーの以前のデータが残っています。`);
      console.log('以前のデータの削除、退出処理を実行します');
      leaveRoom(socket);
    }

    // ユーザー情報
    users[socket.id] = {
      userId: socket.id,
      roomId: roomId,
      isHost: true,
      name: userName
    }

    // ルーム情報
    rooms[roomId] = {
      users: [users[socket.id]],
      turnIndex: 0
    };

    console.log(rooms[roomId].users);

    // ルームを作成
    socket.join(roomId);

    // クライアントにルーム作成完了を通知
    io.to(roomId).emit("roomJoined", rooms[roomId], users[socket.id]);
    io.to(roomId).emit("roomJoinedMessage", users[socket.id]);
    console.log(`socket.id:"${socket.id}"のユーザー "${userName}" がルーム "${roomId}" を作成しました`);
  });

  /** ルーム入室処理 */
  socket.on("joinRoom", (roomId: string, userName: string) => {

    // 以前作成・入室したルームが残っている場合は先に削除する
    const oldUserData: UserObj | undefined = users[socket.id];
    if(oldUserData) {
      console.log(`socket.id: "${socket.id}のユーザーの以前のデータが残っています。`);
      console.log('以前のデータの削除、退出処理を実行します');
      leaveRoom(socket);
    }

    // ユーザー情報追加
    users[socket.id] = {
      userId: socket.id,
      isHost: false,
      roomId: roomId,
      name: userName
    }

    // ルーム情報追加
    if(rooms[roomId]) {
      rooms[roomId].users.push(users[socket.id]);
    };

    //ルームに入室
    socket.join(roomId);

    // クライアントにルーム作成完了を通知
    io.to(roomId).emit("roomJoined", rooms[roomId], users[socket.id]);
    io.to(roomId).emit("roomJoinedMessage", users[socket.id]);
    console.log(`socket.id:"${socket.id}"のユーザー "${userName}" がルーム "${roomId}" に入室しました`);
  });

  /** メッセージを受信し、ルーム内の全員に送信する */
  socket.on("sendMessage", (message: string) => {

    // メッセージの送信元のsocket.idから、ユーザー情報を取得
    const user: UserObj | undefined = users[socket.id];

    if(user) {
        // ユーザ情報から、今いるルームidと名前を取得
        const roomId: string = user.roomId;
        const userName: string = user.name;

        // ルーム内の全員に送信
        io.to(roomId).emit("messageReceived", userName, message);
        io.to(roomId).emit("test");
        console.log(`roomID${roomId}に入室している${userName}がメッセージを送信しました。${message}`);
    }
  });

  /** クライアントからの退出イベントをリッスン */
  socket.on("leaveRoom", () => {
    console.log(`socket.id:"${socket.id}"が退出ボタンを押下しました。`);
    console.log('退出処理を実行します');
    leaveRoom(socket);
  });

  /** クライアントからの切断イベントをリッスン */
  socket.on("disconnect", () => {
    console.log(`socket.id:"${socket.id}"の接続が切れました。`);
    console.log('退出処理を実行します');
    leaveRoom(socket);
  });
});


/** 
 * ルーム退出処理  
 * socket.idを受け取り、該当ユーザを退出させデータから削除する
 */
const leaveRoom = (socket: Socket) => {
  const user: UserObj | undefined = users[socket.id];

  if (user) {

    // 退出するユーザーがホストだった場合、先に他のユーザーにホスト権限を譲渡する
    if (user.isHost) {
      const roomJoinedUser: number = rooms[user.roomId].users.length;
      if (roomJoinedUser > 1) {
        // 通常index[0]にhostが入っているはずなので、index[1]にhostを渡せばいいが、念のためindex[1]がhostじゃないか確認
        const nextHostIndex: number = rooms[user.roomId].users[1].isHost === true ? 2 : 1; 
        rooms[user.roomId].users[nextHostIndex].isHost = true;
        console.log(`ホスト権限を${rooms[user.roomId].users[nextHostIndex].name}に譲渡 isHost ${rooms[user.roomId].users[nextHostIndex].isHost }`);
        const nextHostName = rooms[user.roomId].users[nextHostIndex].name;
        setTimeout(() => {
           // ホストが変更したことをルーム内全クライアントに通知
          io.to(user.roomId).emit("hostChange", nextHostName);
        }, 1000)
      }
    }

    // roomsとusersからそれぞれデータを削除
    rooms[user.roomId].users = rooms[user.roomId].users.filter(user => user.userId !== socket.id);
    delete users[socket.id];

    // ルームから退出したことをルーム内全クライアントに通知
    io.to(user.roomId).emit("leaveRoom", rooms[user.roomId], user);
    io.to(user.roomId).emit("leaveRoomMessage", rooms[user.roomId], user);

    // ルームから退出させる
    socket.leave(user.roomId);
    
    console.log(`ユーザー "${user.name}" がルーム "${user.roomId}" から退出しました`);
    const room = io.sockets.adapter.rooms.get(user.roomId);
    if (room) {
      const numberOfClients = room.size;
      console.log(`ルーム ${user.roomId} にいるクライアントの数: ${numberOfClients}`);
    } else {
      console.log(`ルーム ${user.roomId} は存在しません。`);
    }
  }
}

server.listen(3001, () => {
  console.log("サーバーがポート3001で実行中");
});
