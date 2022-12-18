/* eslint-disable no-undef */
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authenticate = require("./routes/auth/auth-middleware");
const authRouter = require("./routes/auth/auth-router");
const userRouter = require("./routes/users/userRouter");
const messageRouter = require("./routes/message/messageRouter");

const leaveRoom = require("./utils/leave-room");

const server = express();

const socketServer = http.createServer(server);

server.use(helmet());
server.use(cors());
server.use(express.json());

const io = new Server(socketServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const CHAT_BOT = "ChatBot";
let chatRoom = "";
let allUsers = []; // All users in current chat room.

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_room", (data) => {
    // This is data sent from client when join_room event emitted.
    const { username, room } = data;

    // This will Join the user to a socket room.
    socket.join(room);

    let __createdtime__ = Date.now();

    // This block will send a message to all users currently in the room, apart from the user that just joined.
    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });

    // This block will send a welcome msg to user that just joined chat only
    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });

    //This block will Save the new user to the room
    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);
  });

  socket.on("chat_message", function (data) {
    data.username = this.username;
    socket.broadcast.emit("chat_message", data);
  });

  socket.on("disconnect", function (data) {
    socket.broadcast.emit("user_leave", this.username);
  });

  // This block will Send the message to all users in room, including sender
  socket.on("send_message", (data) => {
    const { room } = data;
    io.in(room).emit("receive_message", data);
  });

  socket.on("leave_room", (data) => {
    const { username, room } = data;
    socket.leave(room);
    const __createdtime__ = Date.now();

    // Remove user from memory
    allUsers = leaveRoom(socket.id, allUsers);
    socket.to(room).emit("chatroom_users", allUsers);
    socket.to(room).emit("receive_message", {
      username: CHAT_BOT,
      message: `${username} has left the chat`,
      __createdtime__,
    });
    console.log(`${username} has left the chat`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected from the chat");
    const user = allUsers.find((user) => user.id == socket.id);
    if (user?.username) {
      allUsers = leaveRoom(socket.id, allUsers);
      socket.to(chatRoom).emit("chatroom_users", allUsers);
      socket.to(chatRoom).emit("receive_message", {
        username: CHAT_BOT,
        message: `${user.username} has disconnected from the chat.`,
        __createdtime__,
      });
    }
  });
});

server.use("/api/auth", logger, authRouter);
server.use("/users", logger, userRouter);
server.use("/chat", logger, messageRouter);

server.get("/", logger, (req, res) => {
  res.send(`<h2>Server is Live! </h2>`);
});

socketServer.listen(process.env.SOCKET_PORT, function () {
  console.log("SOCKET Listening on *:" + process.env.SOCKET_PORT);
});

// Middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${
      req.hostname
    }`
  );

  next();
}


module.exports = server;
