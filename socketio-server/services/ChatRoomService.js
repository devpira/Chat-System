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

module.exports = {
    isValidChatRoomCreation,
    isValidJoinChatRoomRequest,
    generateGeneralChatRoom,
    generateDepartmentChatRoom
}
