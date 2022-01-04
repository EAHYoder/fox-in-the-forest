module.exports = (io) => {
  io.on("connect", (socket) => {
    console.log(socket.id, "has made a persistent connection to the server!");

    //this listens to all clients for a logout.  When any client emits a logout event this will broadcast it to all the other connected clients.
    socket.on("logout", () => {
      socket.broadcast.emit("logout");
    });

    socket.on("login", (newPlayer) => {
      socket.broadcast.emit("login", newPlayer);
    });

    socket.on("newDeal", (newDeal) => {
      socket.broadcast.emit("newDeal", newDeal);
    });
  });
};
