import { chatbotData } from "../data/chatbotData";
import { detectIntent } from "../utils/intentClassifier";

// =====================================================
// Random Response Picker
// =====================================================

function getRandomResponse(responses) {

    return responses[
        Math.floor(
            Math.random() * responses.length
        )
    ];

}

// =====================================================
// Get Bot Response
// =====================================================

export function getBotResponse(message) {

    // Empty Message
    if (!message || !message.trim()) {

        return "Please type a message.";

    }

    // Detect User Intent
    const intent = detectIntent(message);

    // Find Matching Knowledge
    const knowledge = chatbotData.find(

        item => item.intent === intent

    );

    // Return Matching Response
    if (knowledge) {

        return getRandomResponse(

            knowledge.responses

        );

    }

    // Unknown Intent
    const unknown = chatbotData.find(

        item => item.intent === "unknown"

    );

    return getRandomResponse(

        unknown.responses

    );

}