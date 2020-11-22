const server = require('http').createServer();
const io = require('socket.io')(server);

const PORT = process.env.PORT || 5000;
require('isomorphic-fetch');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

onlineUsers = [];

//THIS IS HACK, MUST USE DATABASE ---START
liveChats = []

//THIS IS HACK, MUST USE DATABASE ---END

const {
    isValidChatRoomCreation,
    isValidJoinChatRoomRequest,
    generateGeneralChatRoom,
    generateDepartmentChatRoom } = require('./services/ChatRoomService')

io.use(async (socket, next) => {
    if (!socket.handshake.query.token) {
        next(new Error("Failed to authenticate."));
    }

    socket.token = socket.handshake.query.token
    console.log("token", socket.handshake.query.token)

    if (!socket.token) {
        //TO-DO - implement error here:
        new Error("Failed to authenticate.")
    }

    fetch(`https://over.localhost.achievers.com/api/v5/current-member`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${socket.token}`,
        },
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        console.log('server response', response);
        socket.uid = response.id
        socket.currentMember = response
        next();
    }).catch(function (error) {
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

    socket.join(socket.uid)

    //HACKER SOULTION DELETE LATER: 
    myChat = []
    liveChats.forEach((item) => {
        if (item.roomId && item.chatRoom) {
            const participantIds = item.roomId.split("-");

            if (participantIds && participantIds.length === 2) {
                const hasMyId = socket.uid == participantIds[0] || socket.uid == participantIds[1]
                if (hasMyId) {
                    socket.join(item.roomId)
                    myChat.push(item.chatRoom)
                }
            }
        }
    })
    console.log("PASSED")
    //HACKER SOULTION DELETE LATER -- end

    io.to(socket.id).emit("LOAD_CHAT_LIST",
        [generateGeneralChatRoom(socket), ...generateDepartmentChatRoom(socket, socket.currentMember), ...myChat]
    );
    console.log("PASSED")
    // Let other users know you are online:
    onlineUsers.push(socket.uid)
    io.emit("USER_ONLINE_LIST_UPDATE", onlineUsers);

    socket.on("CHAT_MESSAGE_SEND", (message) => {
        console.log(message)
        console.log(socket.uid)
        io.in(message.roomId).emit("CHAT_MESSAGE_RECEIVED", message)
    })

    socket.on("CREATE_NEW_CHAT_ROOM", (toUserId, roomId, chatRoom) => {
        console.log(toUserId)
        console.log(roomId)
        console.log(chatRoom)
        if (!isValidChatRoomCreation(socket.uid, toUserId, roomId, chatRoom)) {
            io.to(socket.id).emit("ON_NEW_CHAT_ROOM_CREATED_FAILED", "Invalid chat room creation.")
            return
        }

        //HACKER SOULTION DELETE LATER: 
        liveChats = [...liveChats, { roomId, chatRoom }]
        //HACKER SOULTION DELETE LATER -- end

        socket.join(roomId)
        io.to(socket.id).emit("ON_NEW_CHAT_ROOM_CREATED", chatRoom)
        io.in(toUserId).emit("SEND_REQUEST_TO_JOIN_CHAT_ROOM", chatRoom)
    })

    socket.on("REQUEST_TO_JOIN_CHAT_ROOM", (roomId) => {
        console.log(roomId)
        if (!isValidJoinChatRoomRequest(socket.uid, roomId)) {
            console.log("BRAAAHH get out of here trying to join a room you can't.......")
            // Send polite error response back:
            io.to(socket.id).emit("REQUEST_TO_JOIN_CHAT_ROOM_FAILED", roomId, "You don't have permission to join this room.")
            return
        }
        socket.join(roomId)
    })

    socket.on("VIDEO_CALL_USER_REQUEST", (userId, myInfo) => {
        console.log("VIDEO_CALL_USER_REQUEST")
        console.log(userId)
        console.log(myInfo)

        io.to(userId).emit("VIDEO_CALL_USER_ANSWER_REQUEST", myInfo)
    })

    socket.on("VIDEO_CALL_USER_DECLINE", (userId, myId) => {
        console.log("VIDEO_CALL_USER_DECLINE")
        console.log(userId)

        io.to(userId).emit("VIDEO_CALL_USER_DECLINE_NOTIFY", myId)
    })

    socket.on("VIDEO_CALL_USER_ANSWER", (userId, myId) => {
        console.log("VIDEO_CALL_USER_ANSWER")
        console.log(userId)

        io.to(userId).emit("VIDEO_CALL_USER_ANSWER_NOTIFY", myId)
    })

    socket.on("VIDEO_CALL_START_STREAM_REQUEST", (userId, id) => {
        console.log("VIDEO_CALL_START_STREAM_REQUEST")
        console.log(userId)
        console.log(id)

        io.to(userId).emit("VIDEO_CALL_START_STREAM_START", id)
    })

    socket.on("VIDEO_CALL_END_STREAM_REQUEST", (userId, myId) => {
        console.log("VIDEO_CALL_END_STREAM_REQUEST")
        console.log(userId)
        console.log(myId)

        io.to(userId).emit("VIDEO_CALL_END_STREAM", myId)
    })

    socket.on('disconnect', () => {
        console.log("User diconnected: ", socket.uid)

        // Let other users know you are  NOT online:
        var index = onlineUsers.indexOf(socket.uid);
        if (index !== -1) {
            onlineUsers.splice(index, 1);
        }

        io.emit("USER_ONLINE_LIST_UPDATE", onlineUsers);

    });
});

server.listen(PORT, () => {
    console.log("Socket IO Server Connected to port: " + PORT);
});
