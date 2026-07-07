import { useState } from "react";
import { SendHorizontal } from "lucide-react";

import '../styles/Chatbot.css';

function ChatInput({

    sendMessage,

    disabled = false,

}) {

    const [message, setMessage] = useState("");

    // ==========================================
    // Send
    // ==========================================

    const handleSend = () => {

        const trimmed = message.trim();

        if (!trimmed) return;

        sendMessage(trimmed);

        setMessage("");

    };

    // ==========================================
    // Enter Key
    // ==========================================

    const handleKeyDown = (e) => {

        if (

            e.key === "Enter" &&

            !e.shiftKey

        ) {

            e.preventDefault();

            handleSend();

        }

    };

    return (

        <div className="chat-input-container">

            <input

                type="text"

                className="chat-input"

                placeholder="Ask me anything..."

                value={message}

                disabled={disabled}

                onChange={(e) =>

                    setMessage(

                        e.target.value

                    )

                }

                onKeyDown={handleKeyDown}

            />

            <button

                className="chat-send-btn"

                onClick={handleSend}

                disabled={

                    disabled ||

                    !message.trim()

                }

            >

                <SendHorizontal size={20} />

            </button>

        </div>

    );

}

export default ChatInput;