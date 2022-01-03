const { db } = require("./db");
const PORT = process.env.PORT || 8080;
const app = require("./app");
const seed = require("../script/seed");
const ioNeedingServer = require("socket.io");

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed();
    } else {
      await db.sync();
    }
    // start listening (and create a 'server' object representing our server)
    const server = app.listen(PORT, () =>
      console.log(`Mixing it up on port ${PORT}`)
    );

    const io = ioNeedingServer(server);
    require("./socket")(io);
  } catch (ex) {
    console.log(ex);
  }
};

init();
