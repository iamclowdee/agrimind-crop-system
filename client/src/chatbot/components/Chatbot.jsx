import { useState } from "react";

import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";

import '../styles/Chatbot.css';

import { getBotResponse } from "../services/chatService";

function ChatBot() {

    // ==========================================
    // Chat Window State
    // ==========================================

    const [isOpen, setIsOpen] = useState(false);

    // ==========================================
    // Chat Messages
    // ==========================================

    const [messages, setMessages] = useState([

        {

            id: 1,

            sender: "bot",

            text:
                "👋 Hello! I'm AgriMind Assistant.\n\nI can help you with:\n\n• Crop Recommendations\n• Soil Health\n• Fertilizers\n• Pricing Plans\n• Farming Calculations\n• General FAQs",

            time: new Date(),

        },

    ]);

    // ==========================================
    // Loading State
    // ==========================================

    const [typing, setTyping] = useState(false);

    // ==========================================
    // Toggle Chat
    // ==========================================

    const toggleChat = () => {

        setIsOpen((prev) => !prev);

    };

    // ==========================================
    // Send Message
    // ==========================================

    const sendMessage = async (message) => {

        if (!message.trim()) return;

        const userMessage = {

            id: Date.now(),

            sender: "user",

            text: message,

            time: new Date(),

        };

        setMessages((prev) => [

            ...prev,

            userMessage,

        ]);

        setTyping(true);

        // Simulate typing delay
        setTimeout(() => {

            const botReply = getBotResponse(message);

            setMessages((prev) => [

                ...prev,

                {

                    id: Date.now() + 1,

                    sender: "bot",

                    text: botReply,

                    time: new Date(),

                },

            ]);

            setTyping(false);

        }, 800);

    };

    return (

        <>

            <ChatButton

                isOpen={isOpen}

                toggleChat={toggleChat}

            />

            {

                isOpen && (

                    <ChatWindow

                        messages={messages}

                        typing={typing}

                        sendMessage={sendMessage}

                        closeChat={toggleChat}

                    />

                )

            }

        </>

    );

}

export default ChatBot;