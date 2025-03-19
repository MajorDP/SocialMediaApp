const { Server } = require("socket.io");
const http = require("http");
require("dotenv").config();

const server = http.createServer();

const io = new Server(server, {
  cors: {
    //Two allowed origins for testing of realtime chat feature
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
  },
});

//Storage for user Ids to send responses to
const users = {};

io.on("connection", (socket) => {
  console.log("Connected: ", socket.id);

  socket.on("join_socket", (uid) => {
    users[uid] = socket.id;
    console.log(`User ${uid} joined the server.`);
  });

  socket.on("sent_message", ({ uid, fid }) => {
    console.log(`${uid} sends a message to ${fid}`);
    const receiverUserId = users[fid];
    io.to(receiverUserId).emit("message_received", fid);
  });
});

server.listen(process.env.SOCKET_PORT, () => {
  console.log(`Socket.IO server running on ${process.env.SOCKET_PORT}`);
});
