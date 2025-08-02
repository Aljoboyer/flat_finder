const { Server } = require("socket.io");
const { commentHandlers } = require("./handlers/commentHandlers");

let io;
const userSocketMap = {}; 

const init = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log('connected ==>', userId)

    //Socket Handlers
     commentHandlers(io, socket, userSocketMap);

    socket.on("disconnect", () => {
      // Find and remove user from userSocketMap
      for (const userId in userSocketMap) {
        if (userSocketMap[userId] === socket.id) {
          delete userSocketMap[userId];
          // console.log(`🧹 Removed mapping for user: ${userId}`);
          io.emit("userOffline", userId);
          break;
        }
      }
    });
    
  });
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = {
  init,
  getIo,
  userSocketMap
};
