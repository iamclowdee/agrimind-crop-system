export const chatbotData = [

    // =====================================================
    // GREETINGS
    // =====================================================

    {
        intent: "greeting",

        category: "general",

        keywords: [

            "hello",
            "hi",
            "hey",
            "good morning",
            "good afternoon",
            "good evening",
            "hola",
            "namaste",
            "hii",
            "helo",
            "heyy"

        ],

        responses: [

            "Hello! 👋 I'm AgriMind Assistant. How can I help you today?",

            "Hi! 🌱 Ask me anything about crops, soil health, fertilizers, subscriptions or farming calculations.",

            "Welcome! I'm here to assist you with AgriMind and agriculture."

        ]

    },

    // =====================================================
    // THANK YOU
    // =====================================================

    {

        intent: "thanks",

        category: "general",

        keywords: [

            "thanks",
            "thank you",
            "thankyou",
            "thx",
            "ty",
            "thanks alot",
            "thank u"

        ],

        responses: [

            "You're welcome! 😊",

            "Happy to help.",

            "Glad I could help. Let me know if you need anything else."

        ]

    },

    // =====================================================
    // GOODBYE
    // =====================================================

    {

        intent: "goodbye",

        category: "general",

        keywords: [

            "bye",
            "goodbye",
            "see you",
            "see ya",
            "later",
            "exit"

        ],

        responses: [

            "Goodbye! 🌾 Have a productive farming season.",

            "Take care! Feel free to chat anytime.",

            "See you soon. Happy farming!"

        ]

    },

    // =====================================================
    // CROP RECOMMENDATION
    // =====================================================

    {

        intent: "recommendation",

        category: "crop",

        keywords: [

            "recommend crop",
            "crop recommendation",
            "best crop",
            "which crop",
            "what crop",
            "suggest crop",
            "crop suggestion",
            "recommend me",
            "crop"

        ],

        responses: [

            "To receive a crop recommendation, open the Dashboard and fill in the Crop Recommendation form with your soil and environmental parameters.",

            "AgriMind predicts the best crop using Nitrogen, Phosphorus, Potassium, pH, rainfall, temperature, humidity and other soil parameters."

        ]

    },

    // =====================================================
    // SOIL HEALTH
    // =====================================================

    {

        intent: "soil",

        category: "soil",

        keywords: [

            "soil",
            "soil health",
            "soil report",
            "soil quality",
            "soil score",
            "soil analysis",
            "soil condition"

        ],

        responses: [

            "Your Soil Health page displays Nitrogen, Phosphorus, Potassium, pH, Humidity and an overall Soil Quality Score.",

            "The Soil Health section helps you understand the quality of your soil before deciding which crop to grow."

        ]

    },

    // =====================================================
    // FERTILIZERS
    // =====================================================

    {

        intent: "fertilizer",

        category: "crop",

        keywords: [

            "fertilizer",
            "fertiliser",
            "urea",
            "dap",
            "npk",
            "compost",
            "organic fertilizer"

        ],

        responses: [

            "Common fertilizers include Urea (Nitrogen), DAP (Nitrogen & Phosphorus), MOP (Potassium), Compost and Vermicompost.",

            "The ideal fertilizer depends on your soil nutrient levels and the recommended crop."

        ]

    },

    // =====================================================
    // PRICING
    // =====================================================

    {

        intent: "pricing",

        category: "subscription",

        keywords: [

            "pricing",
            "price",
            "cost",
            "subscription",
            "premium",
            "starter",
            "professional",
            "plan",
            "plans"

        ],

        responses: [

            "AgriMind currently offers Starter, Premium and Professional subscription plans.",

            "Visit the Pricing page to compare features and pricing for all available subscription plans."

        ]

    },

    // =====================================================
    // PDF
    // =====================================================

    {

        intent: "pdf",

        category: "report",

        keywords: [

            "pdf",
            "download report",
            "report",
            "export",
            "save report"

        ],

        responses: [

            "After generating a crop recommendation, open the Result page and click 'Download Report'.",

            "PDF reports contain your soil values, recommended crop and additional recommendations."

        ]

    },

    // =====================================================
    // HISTORY
    // =====================================================

    {

        intent: "history",

        category: "history",

        keywords: [

            "history",
            "prediction history",
            "old prediction",
            "saved crops",
            "past crops"

        ],

        responses: [

            "The History page stores every crop recommendation you generate.",

            "You can also update crop status, investment, revenue and profit from the History page."

        ]

    },

    // =====================================================
    // ANALYTICS
    // =====================================================

    {

        intent: "analytics",

        category: "analytics",

        keywords: [

            "analytics",
            "profit",
            "graph",
            "charts",
            "cost",
            "revenue"

        ],

        responses: [

            "Analytics become available once you update crop investment and revenue.",

            "AgriMind provides Cost vs Revenue and Profit Trend graphs."

        ]

    },

    // =====================================================
    // LOCATION
    // =====================================================

    {

        intent: "location",

        category: "location",

        keywords: [

            "location",
            "gps",
            "live location",
            "current location"

        ],

        responses: [

            "You can use the 'Use Current Location' button on the Dashboard to automatically detect your location.",

            "Location helps improve crop recommendations by recording where the prediction was generated."

        ]

    },

    // =====================================================
    // UNKNOWN
    // =====================================================

    {

        intent: "unknown",

        category: "general",

        keywords: [],

        responses: [

            "I'm sorry, I couldn't understand your question.\n\nYou can ask me about:\n\n• Crop Recommendations\n• Soil Health\n• Fertilizers\n• Pricing\n• Reports\n• History\n• Analytics",

            "Could you please rephrase your question? I'm here to help with AgriMind features and agriculture."

        ]

    }

];