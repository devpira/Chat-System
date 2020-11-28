const server = require('http').createServer();
const io = require('socket.io')(server);

const PORT = process.env.PORT || 5000;
require('isomorphic-fetch');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const isValidChatRoomCreation = (fromUserId, toUserId, roomId, chatRoom) => {
    const participantIds = roomId.split("-")

    if (!participantIds || participantIds.length !== 2) {
        return false;
    }

    if (roomId !== chatRoom.roomId || chatRoom.isGroupChat) {
        return false;
    }

    let isToUserValid = toUserId == participantIds[0] || toUserId == participantIds[1]
    let isFromUserValid = fromUserId == participantIds[0] || fromUserId == participantIds[1]

    if (!isToUserValid || !isFromUserValid) {
        return false;
    }

    const participants = chatRoom.participants;

    if (participants.length !== 2) {
        return false
    }

    isToUserValid = toUserId == participants[0].id || toUserId == participants[1].id
    isFromUserValid = fromUserId == participants[0].id || fromUserId == participants[1].id

    if (!isToUserValid || !isFromUserValid) {
        return false;
    }

    return true
}

const isValidJoinChatRoomRequest = (currentUserUid, roomId) => {
    const participantIds = roomId.split("-")
    if (!participantIds || participantIds.length !== 2) {
        return false;
    }

    return currentUserUid == participantIds[0] || currentUserUid == participantIds[1]
}

const generateTeamChatRoom = (roomId, name, imageUrl) => {
    return {
        roomId,
        type: 'team-chat',
        name,
        imageUrl,
        chatMessages: [],
        participants: [],
    }
}

const generateGeneralChatRoom = (socket) => {
    const roomId = 'general';
    socket.join(roomId)
    return generateTeamChatRoom(roomId, "General", "https://www.achievers.com/wp-content/uploads/2020/09/achievers-mark-2019.png")
}

const generateDepartmentChatRoom = (socket, currentMember) => {
    let department;
    if (currentMember.displayValues) {
        department = currentMember.displayValues.filter((item) => item.id === 1)
        if (department.length != 1) {
            return [];
        }
        department = department[0]
        if (!department.value) {
            return [];
        }
        department = department.value
    }
    socket.join(department)
    return [generateTeamChatRoom(department, department, "https://www.pngkit.com/png/full/189-1891753_team-icon-png-team-icon-orange.png")]
}

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
    ///temp join room:
    socket.join(socket.uid)

    socket.join("1")
    socket.join("2")

    io.to(socket.id).emit("LOAD_CHAT_LIST",
        [generateGeneralChatRoom(socket), ...generateDepartmentChatRoom(socket, socket.currentMember)]
    );

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

});

server.listen(PORT, () => {
    console.log("Socket IO Server Connected to port: " + PORT);
});

