// Questions mapping
const questionCategories = [
    { id: 0, name: "History", class: "category-history" },
    { id: 1, name: "Science", class: "category-science" },
    { id: 2, name: "Entertainment", class: "category-entertainment" },
    { id: 3, name: "Geography", class: "category-geography" },
    { id: 4, name: "Arts & Literature", class: "category-arts" },
    { id: 5, name: "Food & Drink", class: "category-food" }
];

// This maps question hashes to the actual question text
// IMPORTANT: These hashes MUST match EXACTLY with the hashes in the Vyper contract
const questionMap = {
    // Category 0: History
    "0x6f7768f8fb45ffa244b42be750a1d4c51b55a4d1c17dcc1d4f86d94e89d3a215": "Who was the first President of the United States?",
    "0x7075e9181b5c1c6b79d4472b4d0d930f70cae3fa8626a6a49fa16c4b5bcf1d49": "In which year did World War II end?",
    "0x84fcae82db33bf1b6000fa70b6541acb1e2a20fbba21d30a0bf247d4f4ccc079": "Which ancient civilization built the Machu Picchu complex?",
    "0x8a47f7a1c57ca1ce0a3be02c48a0e7a25c94b24f2d20bacc781a78c0c03c7946": "Who wrote the Declaration of Independence?",
    "0xbf6d4045f306aecb124a36349124e2d4fdfd1a0e95be4fee57b965e7b19b9e58": "Which empire was ruled by Genghis Khan?",
    
    // Category 1: Science
    "0x228e5a4b967267593ede4a96eed4ac4c50e18a33ec4e2eba9f4ae243ee500db1": "What is the chemical symbol for gold?",
    "0x1ff4265cb2ec18516e1755ed6a0bd77d08270a4c1ec1be0fa914313685827c92": "What's the nearest planet to the Sun?",
    "0x37b30e297383aac5cbfd5a7fed689fc4ab42197c1193f0ab5054b3bef1e35c43": "What is the hardest natural substance on Earth?",
    "0x1e6ca7f3e0a5ad43b6b394aa2b23dbb5d6a32a7b35d7060e18a37142ab5774e8": "What is the largest organ in the human body?",
    "0x7c36570ce47a23e24b38b1c42ad8d5b35760dc75a34c8a1fc5eaa3bcf5549c31": "Who developed the theory of relativity?",
    
    // Category 2: Entertainment
    "0x77d8b9a53a40458be1db74327a02f7f8aebe8684d6d2b0bd0d57676c53e3c5f5": "Who played Jack in the movie Titanic?",
    "0x63be7e4a09a56a0b1ee1c45e4186c27f255ce4b8de995fb52e62b9940b22d95c": "What was the first feature-length animated film?",
    "0xae8e5a726b3567ffa8f4ec0be1e87bb0af14a7df37b121a17ad2ff0d5de5a240": "Which band released the album 'Abbey Road'?",
    "0x9f80b92cfe49919dac7cfb74a9c564751a934a9ddee4e43e5f8eba9d5e708d71": "Who created Mickey Mouse?",
    "0x193ee77e5fc3c63c6fc1ea4e9560268a5ff7691c4cf29eaa456d3c361b939e61": "Which TV show features characters named Walter White and Jesse Pinkman?",
    
    // Category 3: Geography
    "0x00bbcb4e0a6308f0f4d35154c02f38b98bcb4aaef44f20b5ba31efbb2f964fc1": "What is the capital of Japan?",
    "0x95a03cb2b95f20ce3b4d0c61f57bc8366c4e2ac4a50ead8259b1db279c8a7a55": "Which country is home to the Great Barrier Reef?",
    "0x911254da1fbe5ec7e11c7f9d249241a9c44186f50ae6cdf61b1bbea7d46aeed5": "What is the longest river in the world?",
    "0x46dfe06540147c50ca645ad25a9fa2ad973c48a8f220c00560dbc25f8e61a024": "Which desert is the largest in the world?",
    "0x47fb9de33bb7cb206aa4a7f8faa9de5a41a0a291e6ad2c74740182a6e5d91eea": "What is the smallest country in the world?",
    
    // Category 4: Arts & Literature
    "0x8c9fb32a17a9b54b627a35bb29d17524aac05fd9b51a06c77acf34e16fe3b2aa": "Who painted the Mona Lisa?",
    "0x1254bd4ba9a83b60a8a467e746efee77ddd37a03bca39fa6031aae28b95d2b4b": "Who wrote 'Romeo and Juliet'?",
    "0xe16917b2a8090d9a9901ad1ff12e513e3a53a40b9a5ce6fefe2a9c474f37a41c": "Which artist cut off his own ear?",
    "0x6d1c06a98eb04c7a85833c921f97b09be4295cc9d1d3f9b4f7f37f14ccc9874b": "Who wrote '1984'?",
    "0x20aee98a94f4f7ea8a2cb17a3256d5132aa57438b615d70b6ad0f9a3ea5feec2": "What is the name of the famous painting of a woman with a pearl earring?",
    
    // Category 5: Food & Drink
    "0x7aa6d1b8e9ba0d6a1d678b171a91b7ff24ccdcbd74ab9dab0fabd46c7ab8c0f5": "What is the main ingredient in guacamole?",
    "0xc8dd101246e5095fd15ff1e797a288b4a58c04146fcf4c9e9a613f22dd9aa860": "Which country is known for inventing pizza?",
    "0x989cffea9cf33fc4b55d228625272a7d796e7c07cc64be1c821b9b040cae5b1d": "What grain is used to make sake?",
    "0xc1aa97bcc8f770de2ff68421de34a54a8f4ea45ce7d4b3a5ad5f46dcf3640623": "Which nut is used to make marzipan?",
    "0x0fbc62a1a1c5a3f9f889d15b45f3de1fc60e384baf36fa35464ffb1a7a85c23c": "What is the main ingredient in traditional hummus?"
};

// Answer map with lowercase keys for case-insensitive matching
const answerMap = {
    // Category 0: History
    "george washington": "0x7b24c36e8e3a46eaa6fbc60a92b5be148be63357a8f58fc15cb0b9649e382cdd",
    "1945": "0xfa217da9294fc840aceae7cb3c7cda08449b0c69ce77c5cfe673bbefa5c6acb4",
    "inca": "0x5d8e2d72a9c5ef7f95c703a8e19972677c358cdfe8b1c44f44abc1d54f6a5da2",
    "thomas jefferson": "0x726f4187aa8ee29aa3683faab19513fb10ac7602b8c889d27bc0ce6ec6ad324e",
    "mongol empire": "0x3a2fa9a7e03e5bd23857b4da65fc51414ae509bcb7bc501baf6c79a15c2593e8",
    
    // Category 1: Science
    "au": "0xfcde8a05d133ce581c111bf13965b025a35f3e15e241f532329c2d83d2a09f15",
    "mercury": "0x7277f3da30e4a53a115fa082a3cc448ba8f20d3a3a5ec99be4b8b5f98c4ac559",
    "diamond": "0xd1c5fe3c95d9eef229e556a7b25dffd7ec866f989fd8c8513b76a37a69656bc3",
    "skin": "0x73631caec5857eb2b2b2e19aee1f28d0db89cce3a42d45ee8d3d901ff741efda",
    "albert einstein": "0xeca0bdf1f95607a917c57848a2be59bd331787be2d1633ca7e66a12a37e1811c",
    
    // Category 2: Entertainment
    "leonardo dicaprio": "0x1cb7e78c64aa82c15779e4a27e88fbca53c5fc5bde6b4ad7d6550fadbf4e3135",
    "snow white and the seven dwarfs": "0x1a5bb83ae36c5d3ce8e5c20cb6c3e1e5de8873c99e0992b2db04490c9afcdca6",
    "the beatles": "0x4ed760888b5683d935e5b590dffe95ec7ed9370baa1dd876830a33c704853b31",
    "walt disney": "0x2e4afc37fd3d4c12e691da2a146ee93ad02b835f79fc03fdc32b2a2cb6997d96",
    "breaking bad": "0x85bc97c2082e4183df1e0f00b4c61ca377ed67f457c8aaa0cafc5feb74a9798d",
    
    // Category 3: Geography
    "tokyo": "0x7d8274355e950a57e8fbbc3ca17becdcd75fc800f6faee94ed9e98e7935f3a69",
    "australia": "0x2e80db1fa6e16bc18c8afa1e4b44fd226d54a0743fae1bf2e1095cb7bdf6e129",
    "nile": "0xf9396a49ae78bef43e09f9729064cd9f3e26abcb0cb6c657317bf84db9aa834b",
    "sahara": "0x67b224362e9db8ce8c9de5e1f134a3fa223a1a8a59aff4a21253f3ce89c8f917",
    "vatican city": "0xe7ec2c9a475c864dfba398827b5323da52aad41a85e2a4f41b2a8a9cf66e1458",
    
    // Category 4: Arts & Literature
    "leonardo da vinci": "0x3c1358b9e71da3c5deee4ebdb0bc57d4d90a45a30dc7e8c7c5165c8992cb2d9e",
    "william shakespeare": "0x1902a7842facad5db97bf11129ed688cf0ca574d25b8c9d8d1b6e3c3ba4e19cf",
    "vincent van gogh": "0x39c5b2c41b1ce431e8dfbfb1d8d84f1ae1fff15d7d3b28a32a7fb1e154e7e32a",
    "george orwell": "0xb12cfbf2df814e50f4f9890cf1667b41363f5d8d3c641db0c760313692e56f3f",
    "girl with a pearl earring": "0x4e574de3b3b9b5ecdaf3f5b8d05c2339f7f55d2af5edd13c34ef5e1dd4eef41a",
    
    // Category 5: Food & Drink
    "avocado": "0x8429e74d41b7ea4f4bcf6cbb6db5beccf044aa64e4be6b538c31c5ec1d40bb4c",
    "italy": "0xed142151342da281874f4e63a158f120309ffac962ae53d2ad049ecdcc7ce73e",
    "rice": "0xd0a82a59e26076b9e82ce650f47aa5c3bf0b90b1b6dbdcf7983a4e8bd59e5f50",
    "almond": "0xe96831d9fc8be45cd1b14d78ca9bce8a11f7b8fe0f12b30e1b556f37d4d4d9d5",
    "chickpeas": "0xea5ac1782ea29c6c15a2b0a2dadab9fb8f36c812ad0de6e5aad4d7e3e6db7333"
};

/**
 * Gets the readable question from a hash
 * @param {string} hash The question hash
 * @return {string} The human-readable question
 */
function getQuestionByHash(hash) {
    return questionMap[hash] || "Unknown question";
}

/**
 * Gets category info by its ID
 * @param {number} categoryId The category ID
 * @return {object} The category information
 */
function getCategoryById(categoryId) {
    return questionCategories.find(cat => cat.id === categoryId) || 
        { name: "Unknown", class: "category-unknown" };
}

/**
 * Hashes an answer to match with contract
 * @param {string} answer The user's answer
 * @return {string} The hashed answer for the contract
 */
function hashAnswer(answer) {
    // Convert to lowercase for case-insensitive matching
    const normalizedAnswer = answer.trim().toLowerCase();
    
    // Check if we have a pre-hashed value
    if (answerMap[normalizedAnswer]) {
        return answerMap[normalizedAnswer];
    }
    
    // If not in our map, hash it directly
    // This uses ethers.js utils
    return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(answer));

    //edit test
}