// ======================================================
// Levenshtein Distance
// ======================================================

function levenshteinDistance(a, b) {

    const matrix = [];

    const lenA = a.length;

    const lenB = b.length;

    for (let i = 0; i <= lenB; i++) {

        matrix[i] = [i];

    }

    for (let j = 0; j <= lenA; j++) {

        matrix[0][j] = j;

    }

    for (let i = 1; i <= lenB; i++) {

        for (let j = 1; j <= lenA; j++) {

            if (b.charAt(i - 1) === a.charAt(j - 1)) {

                matrix[i][j] = matrix[i - 1][j - 1];

            }

            else {

                matrix[i][j] = Math.min(

                    matrix[i - 1][j - 1] + 1,

                    matrix[i][j - 1] + 1,

                    matrix[i - 1][j] + 1

                );

            }

        }

    }

    return matrix[lenB][lenA];

}

// ======================================================
// Similarity Percentage
// ======================================================

export function similarity(a, b) {

    if (!a || !b) return 0;

    a = a.toLowerCase().trim();

    b = b.toLowerCase().trim();

    const distance = levenshteinDistance(a, b);

    const maxLength = Math.max(a.length, b.length);

    if (maxLength === 0) return 100;

    return ((maxLength - distance) / maxLength) * 100;

}

// ======================================================
// Best Match
// ======================================================

export function getBestMatch(input, keywords) {

    let bestKeyword = null;

    let highestScore = 0;

    for (const keyword of keywords) {

        const score = similarity(input, keyword);

        if (score > highestScore) {

            highestScore = score;

            bestKeyword = keyword;

        }

    }

    return {

        keyword: bestKeyword,

        score: highestScore,

    };

}