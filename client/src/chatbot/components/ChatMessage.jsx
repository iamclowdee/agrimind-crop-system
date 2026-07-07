import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";
import '../styles/Chatbot.css';

function ChatMessage({ message }) {

    const [copied, setCopied] = useState(false);

    const isBot = message.sender === "bot";

    // ==========================================
    // Copy Message
    // ==========================================

    const copyMessage = async () => {

        try {

            await navigator.clipboard.writeText(message.text);

            setCopied(true);

            setTimeout(() => {

                setCopied(false);

            }, 2000);

        }

        catch (error) {

            console.error(error);

        }

    };

    // ==========================================
    // Format Time
    // ==========================================

    const formattedTime = new Date(

        message.time

    ).toLocaleTimeString(

        [],

        {

            hour: "2-digit",

            minute: "2-digit",

        }

    );

    return (

        <div

            className={`chat-message-row ${

                isBot

                    ? "bot-row"

                    : "user-row"

            }`}

        >

            {

                isBot && (

                    <div className="chat-avatar-small">

                        <Bot size={18} />

                    </div>

                )

            }

            <div

                className={`chat-message ${

                    isBot

                        ? "bot-message"

                        : "user-message"

                }`}

            >

                <div className="chat-text">

                    {message.text}

                </div>

                <div className="chat-footer">

                    <span className="chat-time">

                        {formattedTime}

                    </span>

                    {

                        isBot && (

                            <button

                                className="copy-btn"

                                onClick={copyMessage}

                                title="Copy"

                            >

                                {

                                    copied

                                        ?

                                        <Check size={15} />

                                        :

                                        <Copy size={15} />

                                }

                            </button>

                        )

                    }

                </div>

            </div>

            {

                !isBot && (

                    <div className="chat-avatar-small user-avatar">

                        <User size={18} />

                    </div>

                )

            }

        </div>

    );

}

export default ChatMessage; 