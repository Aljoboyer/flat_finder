const { Server } = require("socket.io");
const { commentHandlers } = require("./handlers/commentHandlers");
const { rentReqHandlers } = require("./handlers/rentReqHandlers");
const { followHandler } = require("./handlers/followHandler");
const { postPropertyHandler } = require("./handlers/postPropertyHandler");
const { chatHandler } = require("./handlers/chatHandler");
const { ConversationServ } = require("../messageServ/ConversationServ");

let io;
const userSocketMap = {}; 

const init = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", async (socket) => {
    const userId = socket.handshake.query.userId;
    console.log('connected ==>', userId)
    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    socket.on('userConnected', async (userid) => {
          const conversations = await ConversationServ(userid);
  
          const conversationUserIds = conversations.map(
            (conv) => conv.otherUser._id.toString()
          );

          const onlinePartners = conversationUserIds.filter(
            (partnerId) => userSocketMap[partnerId]
          );

          // Send only relevant online users to this client
          socket.emit("onlineUsers", onlinePartners);
    })
    
    // 4️⃣ Notify their partners that THIS user is now online
    socket.on('justNowConnected', async () => {
          const conversations = await ConversationServ(userId);

        const conversationUserIds = conversations.map(
          (conv) => conv.otherUser._id.toString()
        );

        const onlinePartners = conversationUserIds.filter(
          (partnerId) => userSocketMap[partnerId]
        );

      onlinePartners.forEach(partnerId => {
        if (userSocketMap[partnerId]) {
          io.to(userSocketMap[partnerId]).emit("userOnline", userId);
        }
      });
    })
    
    //Socket Handlers
    commentHandlers(io, socket, userSocketMap);
    rentReqHandlers(io, socket, userSocketMap);
    followHandler(io, socket, userSocketMap);
    postPropertyHandler(io, socket, userSocketMap);
    chatHandler(io, socket, userSocketMap);
    
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
