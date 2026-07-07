import { chatbotData } from "../data/chatbotData";
import { getBestMatch } from "./fuzzyMatcher";

// ======================================================
// Normalize Text
// ======================================================

function normalize(text) {

    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, " ");

}

// ======================================================
// Detect Intent
// ======================================================

export function detectIntent(message) {

    const input = normalize(message);

    let bestIntent = "unknown";

    let highestScore = 0;

    for (const item of chatbotData) {

        let score = 0;

        //--------------------------------------------------
        // 1. Exact Match
        //--------------------------------------------------

        if (item.keywords.includes(input)) {

            return item.intent;

        }

        //--------------------------------------------------
        // 2. Contains Match
        //--------------------------------------------------

        item.keywords.forEach((keyword) => {

            const cleanKeyword = normalize(keyword);

            if (input.includes(cleanKeyword)) {

                score += 40;

            }

            if (cleanKeyword.includes(input)) {

                score += 30;

            }

        });

        //--------------------------------------------------
        // 3. Word Match
        //--------------------------------------------------

        const inputWords = input.split(" ");

        item.keywords.forEach((keyword) => {

            const words = normalize(keyword).split(" ");

            inputWords.forEach((word) => {

                if (words.includes(word)) {

                    score += 10;

                }

            });

        });

        //--------------------------------------------------
        // 4. Fuzzy Match
        //--------------------------------------------------

        const fuzzy = getBestMatch(

            input,

            item.keywords

        );

        if (fuzzy.score >= 90) {

            score += 100;

        }

        else if (fuzzy.score >= 80) {

            score += 80;

        }

        else if (fuzzy.score >= 70) {

            score += 60;

        }

        else if (fuzzy.score >= 60) {

            score += 40;

        }

        //--------------------------------------------------

        if (score > highestScore) {

            highestScore = score;

            bestIntent = item.intent;

        }

    }

    //------------------------------------------------------

    if (highestScore < 40) {

        return "unknown";

    }

    return bestIntent;

}