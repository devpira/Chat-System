const server = require('http').createServer();
const io = require('socket.io')(server);

const PORT = process.env.PORT || 5000;
require('isomorphic-fetch');

const axios = require('axios')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

io.use(async (socket, next) => {
    if (!socket.handshake.query.token) {
        next(new Error("Failed to authenticate."));
    }
    socket.uid = 123455
    socket.token = socket.handshake.query.token
    console.log("token", socket.handshake.query.token)

    if (!socket.token) {
        //TO-DO - implement error here:
        new Error("Failed to authenticate2.")
    }

    fetch("https://over.localhost.achievers.com/api/v5/current-member", {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${socket.token}`,
        },
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log('server response', response);
            socket.uid = response.id
            socket.currentMember = response
            next();
        })
        .catch(function (error) {
            console.error(error)
            next(new Error("Failed to authenticate."));
        });
}).on('connection', socket => {
    console.log("User connected, Socket ID: ", socket.id)


    if (!socket.uid || !socket.token || !socket.currentMember) {
        //TO-DO - implement error here:
        new Error("Failed to authenticate2.")
    }
    console.log("uid: ", socket.uid)
    console.log("currentMember: ", socket.currentMember)
    io.to(socket.id).emit("LOAD_CURRENT_MEMBER", socket.currentMember)
   // console.log("currentMember: ", "herhere")
    socket.join("1")
    socket.join("2") 
    io.to(socket.id).emit("LOAD_CHAT_LIST", [{ roomId: "1", chatMessages: [], participants: [{ name: "Bill Pooper", imageUrl: "https://i.pinimg.com/564x/04/bb/21/04bb2164bbfa3684118a442c17d086bf.jpg" }] }, { roomId: "2", chatMessages: [], participants: [{ name: "Jilly Silly", imageUrl: "https://avatarfiles.alphacoders.com/165/165325.jpg" }] }]);
    
   // console.log("currentMember: ", "herhere")
    // const authParams = {

    // fetch("https://over.localhost.achievers.com/api/v5/current-member", {
    //     method: 'GET',
    //     headers: {
    //         Authorization: `Bearer ${socket.token}`,
    //     },
    // })
    //     .then(function (response) {
    //         console.log("response:", response)
    //         console.log("response:", response.data)
    //         return response.json();
    //     })
    //     .then(function (response) {
    //         console.log('server response', response);
    //         // res.send(response);
    //     })
    //     .catch(function (error) {
    //         console.error(error)
    //         //res.send(error);
    //     });


    // })
    // .catch(function (error) { 
    //     console.log(error);
    // });

    //window.location.replace(loginUrl);
    // fetch("http://over.localhost.achievers.com/oauth/v2/openIDConnectClient/token", {
    //     method: 'POST',
    //     headers: {
    //         // 'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //         // 'Access-Control-Allow-Origin': '*',
    //         // 'Content-Type': 'application/json',
    //     },

    //     body: JSON.stringify(authParams)
    // })
    //     .then(function (response) {
    //        // console.log("response:", response)
    //         //return response.json();
    //         return response.json();
    //     })
    //     .then(function (response) {
    //         console.log('server response', response);

    //     })
    //     .catch(function (error) {
    //         console.error(error)
    //         //res.send(error);
    //     });

    fetch("https://over.localhost.achievers.com/api/v5/announcements", {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${socket.token}`,
        },
    })
        .then(function (response) {
            console.log("response:", response.data)
            return response.json();
        })
        .then(function (response) {
            console.log('server response', response);
            // res.send(response);
        })
        .catch(function (error) {
            console.error(error)
            //res.send(error);
        });
    //  grpcResolver( 
    //     {
    //         grpcClient: userClient,
    //         grpcFunction: 'GetUser',
    //         authentication: { uid: socket.uid },
    //         requestParams: { uid: socket.uid },
    //         onSuccess: (result) => {
    //             console.log("CURRENT USER: ", result)
    //             io.to(socket.id).emit("LOAD_CURRENT_MEMBER", result)
    //             socket.join("1")
    //             socket.join("2")
    //             console.log("CAME HERE")
    //             io.to(socket.id).emit("LOAD_CHAT_LIST", [{ roomId: "1", chatMessages: [], participants: [{ name: "Bill Pooper", imageUrl: "https://i.pinimg.com/564x/04/bb/21/04bb2164bbfa3684118a442c17d086bf.jpg" }] }, { roomId: "2", chatMessages: [], participants: [{ name: "Jilly Silly", imageUrl: "https://avatarfiles.alphacoders.com/165/165325.jpg" }] }]);

    //             return result
    //         }
    //     }
    // )

    socket.on("CHAT_MESSAGE_SEND", (message) => {
        console.log(message)
        io.in(message.roomId).emit("CHAT_MESSAGE_RECEIVED", message)
    })

});

server.listen(PORT, () => {
    console.log("Socket IO Server Connected to port: " + PORT);
});

