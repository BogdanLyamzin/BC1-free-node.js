const ws = new require("ws");

const wsServer = new ws.Server({port: 5000});

const socketList = [];

wsServer.on("connection", (socket)=> {
    socketList.push(socket)
    // console.log("New frontend connected");
    setTimeout(()=> {
        socket.send("Welcome to server")
    }, 3000)

    socketList.forEach(item => {
        if(item !== socket) {
            item.send("New member connected")
        }
    })
})