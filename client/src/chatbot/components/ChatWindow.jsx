import { useEffect, useRef } from "react";
import { Bot, X } from "lucide-react";

import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

import '../styles/Chatbot.css';

function ChatWindow({

    messages,

    typing,

    sendMessage,

    closeChat,

}) {

    const bottomRef = useRef(null);

    // ==========================================
    // Auto Scroll
    // ==========================================

    useEffect(() => {

        bottomRef.current?.scrollIntoView({

            behavior: "smooth",

        });

    }, [messages, typing]);

    return (

        <div className="chat-window">

            {/* =======================================
                HEADER
            ======================================== */}

            <div className="chat-header">

                <div className="chat-header-left">

                    <div className="chat-avatar">

                        <Bot size={22} />

                    </div>

                    <div>

                        <h3>

                            AgriMind Assistant

                        </h3>

                        <p>

                            Online

                        </p>

                    </div>

                </div>

                <button

                    className="chat-close-btn"

                    onClick={closeChat}

                >

                    <X size={22} />

                </button>

            </div>

            {/* =======================================
                BODY
            ======================================== */}

            <div className="chat-body">

                {

                    messages.map((message) => (

                        <ChatMessage

                            key={message.id}

                            message={message}

                        />

                    ))

                }

                {

                    typing && (

                        <TypingIndicator />

                    )

                }

                <div ref={bottomRef} />

            </div>

            {/* =======================================
                INPUT
            ======================================== */}

            <ChatInput

                sendMessage={sendMessage}

                disabled={typing}

            />

        </div>

    );

}

export default ChatWindow;