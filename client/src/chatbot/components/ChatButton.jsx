import { MessageCircle, X } from "lucide-react";
import '../styles/Chatbot.css';

function ChatButton({

    isOpen,

    toggleChat,

}) {

    return (

        <button

            className="chat-button"

            onClick={toggleChat}

            aria-label="Open Chatbot"

        >

            {

                isOpen

                    ?

                    <X size={26} />

                    :

                    <MessageCircle size={26} />

            }

        </button>

    );

}

export default ChatButton;