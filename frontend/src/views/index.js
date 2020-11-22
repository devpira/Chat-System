import React from 'react';
import { ChatProvider } from '../providers/ChatProvider';
import { VideoChatProvider } from '../providers/VideoChatProvider';
import MainChat from './ChatHome'

const ChatApp = () => {
    return (
        <ChatProvider>
            <VideoChatProvider>
                <MainChat />
            </VideoChatProvider>
        </ChatProvider>
    );
}

export default ChatApp;