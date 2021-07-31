const knex = require("knex");
const { socket } = require("socket.io");
const app = require("./app");
const io = require("socket.io")(4000, {
  cors: {
    origin: ["url"],
  },
});

const { PORT, DATABASE_URL } = require("./config");

const db = knex({
  client: "pg",
  connection: DATABASE_URL,
});

app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

//set max connections for room to 5
const connections = [null, null, null, null, null];

io.on("connection", (socket) => {
  console.log(socket.id);
  // find an available player
  // let playerIndex = -1
  // for (const i in connections) {
  //   if(connections[i]=== null){
  //     playerIndex = i
  //     break
  //   }
  // }
  // Ignore player 6
  //if (playerIndex === -1) return
  // Tell the conncecting player what player number they are
  // socket.emit('player-number', playerIndex)
  // console.log(`Player ${playerIndex} has connected`)
  socket.on("custom-event", (params) => {
    console.log(params);
  });
});
