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
// These should match the hashes you used in the contract
const questionMap = {
    // Category 0: History
    "0x1e0a9e90c9b452f8cd1e37ef421e4a0311c5489c0d73d15f7a0c55f71383edc9": "Who was the first President of the United States?",
    "0x4f820aa0e9a97ab66b6303cb55a4cec8dbe6b41063d2343db7edbbafb59e2cad": "In which year did World War II end?",
    "0xee5a60c93069672ad68de33f3771b87b6950415c422c87c7dca1c70dad3d2324": "Which ancient civilization built the Machu Picchu complex?",
    "0x39a7ab343f73d7c08cf0b8ad8ae4d5ad758bba6a7d3abb6fcca51f3905e4cd7f": "Who wrote the Declaration of Independence?",
    "0x0bc4fca0d8dd8a4366f0a6a40c8d778db8b9da478a4d00b1a35967bcebdb8b5d": "Which empire was ruled by Genghis Khan?",
    
    // Category 1: Science
    "0x1af6a986991b4edac0848c4c651275e9524775ae2d6a28926a3b1075aa595652": "What is the chemical symbol for gold?",
    "0xda36ba2a27e3a3d9e3f0b637672d6b6a7434d297ff5b5e5c8c01eafd67cebf8d": "What's the nearest planet to the Sun?",
    "0x80b70a062219ce68d6dcb41d8cc3a1987315aa5ed08be6b101aad7b5b7f19a5d": "What is the hardest natural substance on Earth?",
    "0xd2c47645364cf47098e2c36c964f9cc079f01c1cae22605c4ec4d2ae8ec67be1": "What is the largest organ in the human body?",
    "0x28e52bc99b6599ac43dd4bc6c9d2fce9b5d48f6b6a96db0f6c442c0bedbec41c": "Who developed the theory of relativity?",
    
    // Category 2: Entertainment
    "0x9b4a61fbda1e20c9b030b6d5f7ec7a95d1cfcbf4d3c9eb36af63d34e84458b24": "Who played Jack in the movie Titanic?",
    "0xb5b06f74a26c7a2e204bbef723baf2937c1cf1e5fc16c67d1b2094b16fad9bc3": "What was the first feature-length animated film?",
    "0x4e90fecf45a04eaf56a7a16083e61ae0bbb0a6d2b70e07478118e4908302e064": "Which band released the album 'Abbey Road'?",
    "0x7c70560918c19c9563ececec21f6a8e7e0cf160da94dac5b383a8bca4cffacae": "Who created Mickey Mouse?",
    "0x32a37f44693d57f8a2f0e2fcc6a2be3a32c7e0b36c5ab9c5be3aa3fa6ae5c9c6": "Which TV show features characters named Walter White and Jesse Pinkman?",
    
    // Category 3: Geography
    "0xbdb83beac12c14fb37a14fdd26c38f4571e8d09ef89259bb0a708a34c9ad2ec9": "What is the capital of Japan?",
    "0x02dede78b4819ec4bb5e5c8af68a0fb8ba06aa0de020716ef9a01a5f08a24a61": "Which country is home to the Great Barrier Reef?",
    "0xf92ae5e16ebf133c7e3def95d8fff1fc5d0fc418774477ddd5c19af9a47b507e": "What is the longest river in the world?",
    "0xd1d09feaa52db32a70f88f6aaed7ca43e95c42c2d931998d9d9ff1b6b3cc7aa8": "Which desert is the largest in the world?",
    "0xb93ef8d1ed0d0dce9a6d2c87a8f02ed30ea05a7a1b2ac7db8a5e7ae94870a899": "What is the smallest country in the world?",
    
    // Category 4: Arts & Literature
    "0x2aad8f60fc1fa97503b8c6c5b6b7b7a1ec634a8970e86111f8e850ce7808186c": "Who painted the Mona Lisa?",
    "0x94bac969a2691a978724d14e5e9a0fa4eff7a75db0bddc3739e33c655f3e381d": "Who wrote 'Romeo and Juliet'?",
    "0x70f3fca98de9ec5eea919c2b6ad54f7c73dd4ae2dc14d6bf9d01f8cf80cafa24": "Which artist cut off his own ear?",
    "0x91a2c94bb7d66be67b5e53b76558670fac67b1b4eb5b7cf0e61e9e63ac6096a1": "Who wrote '1984'?",
    "0x3fc40f1c41fa4b8cf36e6c1aa08772ef33ad6629e8c39275cbee4ee328685d64": "What is the name of the famous painting of a woman with a pearl earring?",
    
    // Category 5: Food & Drink
    "0xf15674ec15b75c3878d3e06214fc2fc7d8c7c72f0c2c6a50c553be687d4effb8": "What is the main ingredient in guacamole?",
    "0x26ddd34e8117f7e429bcc763f4515dc50b1775f62b3eced3f2becdda4793bedl": "Which country is known for inventing pizza?",
    "0xde2b1eed0b05c398ac9ec67df160fd04b3d75834c51a437af9bb5c4e1be0cf9b": "What grain is used to make sake?",
    "0xe74a5d8eac52b5d0789e184c9a0bdf4173b453a2aa5db334f5efa57d20e2f6c7": "Which nut is used to make marzipan?",
    "0x3f40c95f18e7baf4f2e2ef42c60e3e9e6a5fc19afe6e0150b2629d54a3b1bfb7": "What is the main ingredient in traditional hummus?"
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
    console.log('Getting question for hash:', hash);
    
    // Add some logging to see what's in questionMap
    console.log('Full QuestionMap:', questionMap);
    
    const question = questionMap[hash];
    console.log('Retrieved Question:', question);
    
    return question || "Unknown question";
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
}