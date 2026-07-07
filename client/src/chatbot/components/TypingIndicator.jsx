import { Bot } from "lucide-react";
import '../styles/Chatbot.css';

function TypingIndicator() {

    return (

        <div className="chat-message-row bot-row">

            <div className="chat-avatar-small">

                <Bot size={18} />

            </div>

            <div className="typing-container">

                <span className="typing-dot"></span>

                <span className="typing-dot"></span>

                <span className="typing-dot"></span>

            </div>

        </div>

    );

}

export default TypingIndicator;