const { ethers } = require('ethers');

// Questions and answers from the Vyper contract
const questions = [
    { category: 0, question: "Who was the first President of the United States?", answer: "George Washington" },
    { category: 0, question: "In which year did World War II end?", answer: "1945" },
    { category: 0, question: "Which ancient civilization built the Machu Picchu complex?", answer: "Inca" },
    { category: 0, question: "Who wrote the Declaration of Independence?", answer: "Thomas Jefferson" },
    { category: 0, question: "Which empire was ruled by Genghis Khan?", answer: "Mongol Empire" },
    { category: 1, question: "What is the chemical symbol for gold?", answer: "Au" },
    { category: 1, question: "What's the nearest planet to the Sun?", answer: "Mercury" },
    { category: 1, question: "What is the hardest natural substance on Earth?", answer: "Diamond" },
    { category: 1, question: "What is the largest organ in the human body?", answer: "Skin" },
    { category: 1, question: "Who developed the theory of relativity?", answer: "Albert Einstein" },
    { category: 2, question: "Who played Jack in the movie Titanic?", answer: "Leonardo DiCaprio" },
    { category: 2, question: "What was the first feature-length animated film?", answer: "Snow White and the Seven Dwarfs" },
    { category: 2, question: "Which band released the album 'Abbey Road'?", answer: "The Beatles" },
    { category: 2, question: "Who created Mickey Mouse?", answer: "Walt Disney" },
    { category: 2, question: "Which TV show features characters named Walter White and Jesse Pinkman?", answer: "Breaking Bad" },
    { category: 3, question: "What is the capital of Japan?", answer: "Tokyo" },
    { category: 3, question: "Which country is home to the Great Barrier Reef?", answer: "Australia" },
    { category: 3, question: "What is the longest river in the world?", answer: "Nile" },
    { category: 3, question: "Which desert is the largest in the world?", answer: "Sahara" },
    { category: 3, question: "What is the smallest country in the world?", answer: "Vatican City" },
    { category: 4, question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
    { category: 4, question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
    { category: 4, question: "Which artist cut off his own ear?", answer: "Vincent van Gogh" },
    { category: 4, question: "Who wrote '1984'?", answer: "George Orwell" },
    { category: 4, question: "What is the name of the famous painting of a woman with a pearl earring?", answer: "Girl with a Pearl Earring" },
    { category: 5, question: "What is the main ingredient in guacamole?", answer: "Avocado" },
    { category: 5, question: "Which country is known for inventing pizza?", answer: "Italy" },
    { category: 5, question: "What grain is used to make sake?", answer: "Rice" },
    { category: 5, question: "Which nut is used to make marzipan?", answer: "Almond" },
    { category: 5, question: "What is the main ingredient in traditional hummus?", answer: "Chickpeas" }
];

// Function to compute Keccak-256 hash
function computeHash(input) {
    return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(input));
}

// Loop through questions and answers to verify hashes
questions.forEach((q, index) => {
    const questionHash = computeHash(q.question);
    const answerHash = computeHash(q.answer.toLowerCase()); // Normalize answer to lowercase

    console.log(`Question ${index + 1}: ${q.question}`);
    console.log(`Computed Question Hash: ${questionHash}`);
    console.log(`Computed Answer Hash: ${answerHash}`);
    console.log('----------------------------------------');
});