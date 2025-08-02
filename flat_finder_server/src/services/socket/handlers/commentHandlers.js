
const commentHandlers = (io, socket, userSocketMap) => {
    socket.on("addComments", (comment) => {
      console.log('here')
        io.emit("receivedcomments", comment)
        // socket.broadcast.emit("notifyuser", `${comment.commenter_id} Has commented on post`)
      })
};

module.exports = { commentHandlers };
