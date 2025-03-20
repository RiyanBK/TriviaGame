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
    "0xb7413592c82021e29f2835540b36663d942b95970fcbce2bdd7d809c05ad64fd": "Who was the first President of the United States?",
    "0x3141f3c7c662b4d41a6a7abc6c3818fdb79df0098c75c7098867daef985b0812": "In which year did World War II end?",
    "0x11a59fb5fa366e605994777a92d699291d94d3a78f6b779d7db95d81ddd075d0": "Which ancient civilization built the Machu Picchu complex?",
    "0xa97bbeded1e045c37850db8fe33430d2c421095376b0f706dac1cf7d65704550": "Who wrote the Declaration of Independence?",
    "0x0b1c6a94529e9077d6c419a002b763b15cd7c7cd4064985474881af79a9ec021": "Which empire was ruled by Genghis Khan?",
    
    // Category 1: Science
    "0xf27ff176a73a48e5ec67ec9c88115dfb1f41a6d954f1dfb61cf72cb1d86cbd1a": "What is the chemical symbol for gold?",
    "0xa82167bd5141b90d69ed03aead2e5b261b93e9bf3a6ffb935d548b6f91e2ca6d": "What's the nearest planet to the Sun?",
    "0xb904eb87fd4590d5ef96d7b4f9344b0b037b7ebc69e7ca1522ffc328bdf12c4f": "What is the hardest natural substance on Earth?",
    "0x5d41010bbc8a288e0262a38d7d4d6bfaed9b85f1f8a1a0a9799521453a7250ad": "What is the largest organ in the human body?",
    "0x30d48c6e6e79c1443f2d1b1306550ce8947405cc71462d453856b1b3598894d6": "Who developed the theory of relativity?",
    
    // Category 2: Entertainment
    "0xd416475e8a381b358607c53b05cb8da5821d4b8e26b8af7b4070e56f22996879": "Who played Jack in the movie Titanic?",
    "0x3f10053da086e92d7d2bcf3384e973ac54927f33adbf287a2b6cafacf1683d4b": "What was the first feature-length animated film?",
    "0x3edad96b4d693e51a38dde4dacc1784f8f6a0ae2570792035c9cda274af461ab": "Which band released the album 'Abbey Road'?",
    "0xe1dc88cf7d13470ee7818c804bc01928e674282ab4053e086eb0d1872d7205cc": "Who created Mickey Mouse?",
    "0xdc3bf8bc962a8c8513bd96e7bdee11a16ffea90da0da963a72cc15375f248503": "Which TV show features characters named Walter White and Jesse Pinkman?",
    
    // Category 3: Geography
    "0xf6dbfb66510ab795f19e55290474fbff4f87d9398bdcc6797eef554dfef5d0ec": "What is the capital of Japan?",
    "0xb4a305878ac3ad0de5dd53060f3850466e6dc1462fd6d268a7796d4187808d5f": "Which country is home to the Great Barrier Reef?",
    "0xa7084441b2948ba09d376ac6e3b46579c63ec5d26b33b7b84a8b6ad41dba6d8c": "What is the longest river in the world?",
    "0x0ad156168df78522d0f72dadadb96577a866f465d28d7f835a03d5564d0a1ab3": "Which desert is the largest in the world?",
    "0xf5db09b181ee30a81cc2dd4099db953b955a78c647824c674c9f488f48700e95": "What is the smallest country in the world?",
    
    // Category 4: Arts & Literature
    "0x5b91ad1d83998b72c9faec6d73124c74c2c816e102317506b9b5c2eea84b67fe": "Who painted the Mona Lisa?",
    "0x457f820d8c913a9de0efc859ac29828b85187297b3ef95b7da0dabcef57c6c91": "Who wrote 'Romeo and Juliet'?",
    "0x5f36a37eee069051270e3ef2cfa14723a30c68e4139d0370353c0ebf4dc572cd": "Which artist cut off his own ear?",
    "0xf8ec4b3b2604ec5f5910dcdc6b6e6e6a91fc1a76c05a6e70f4d558eb144753f6": "Who wrote '1984'?",
    "0x923da3c07c0c2a5742a42522895a840bf926cab988bc86213242aa84df72bf45": "What is the name of the famous painting of a woman with a pearl earring?",
    
    // Category 5: Food & Drink
    "0xb9933a1fb674c62f2ab4f1b91ac8d083bd1194de25213bbe75c296ed3a1f3a79": "What is the main ingredient in guacamole?",
    "0xc98f62ea962a015f2282a1edd41c6bf1608da8b12e6970027bcd64471f1e5cce": "Which country is known for inventing pizza?",
    "0x12321f023e2da16327635e3efc9e5a5934f01821cd35c9e74e8523fa271474a7": "What grain is used to make sake?",
    "0xe0afe97533f186b3e9abdd807c9d0f2b7bc671f17c0c8a5cdadcb05dd7106b08": "Which nut is used to make marzipan?",
    "0xd913d0533defcabf563118fe720869ebd541b4f0eac69f40603e0354d5308a41": "What is the main ingredient in traditional hummus?"
};

// Answer map with lowercase keys for case-insensitive matching
const answerMap = {
    // Category 0: History
    "george washington": "0x22982189b5044e4c5b81d6b9965e6567b9b423efd25f99f828efe4f30099e3b1",
    "1945": "0x87ab71fbdf35e4aaad8bfc8f0d31bc993245e6516e22a33d6f0766e698769019",
    "inca": "0x21452effb4c0afdffc9574b8a491bc2c5fec6b6da6e0bac90eb30f62952a95c5",
    "thomas jefferson": "0xa5a234fb6d5d39d355eba030d23b7fac6c01232c5a3ab6ba4d9e43d2324dba55",
    "mongol empire": "0x116c0251f31367eca43cc2b1b2bf3e3ee7a5d2053599681f1df373665d770797",
    
    // Category 1: Science
    "au": "0xfcde8a05d133ce581c111bf13965b025a35f3e15e241f532329c2d83d2a09f15",
    "mercury": "0x1b2a9396f15abb04ba521f5cdf01f4600e3165abeaa58193d70534e575372638",
    "diamond": "0xaadb29765cb3e4f21bde5ecd65db8e565d901b6c9394dcec22aa81b8ff2d6e2f",
    "skin": "0x204cfb2cef51dd1f47e23035ad1718c53821542620bfb50f5e4695abccda4e3c",
    "albert einstein": "0xee291c68a09a3a31851d6c7a5f6bfc6cbe159b199a9fd740aae0f92badf6d3d3",
    
    // Category 2: Entertainment
    "leonardo dicaprio": "0x0d36886a28924af69f715d73fadbde9a184984f47832155c0d66e1878fdb1383",
    "snow white and the seven dwarfs": "0x16425bf28dd08a85ad667525d90ae203d76e13c3297faf2659f9cd712ab54ba1",
    "the beatles": "0x72d66bb54952dafe364ae523d67e97bbac4e1801536bc8b64d4fd1b13f74b2d6",
    "walt disney": "0xc13292ca2ee5df612f91958cc909f15127b5ab0c7ef5ef70cadd91d883c762e7",
    "breaking bad": "0x3c1d6c81eee605147112589fa9a8b60d775159a9622c8277a80f3d450c3a79b6",
    
    // Category 3: Geography
    "tokyo": "0x2992e958b7499c60c719cb5283ceca09839b185a0283a816c1c70040be204d77",
    "australia": "0x8ec7689e5099b1df60b71b1872a0c155c200cf0cb8a0172ebd30e0decf122c9a",
    "nile": "0x1031406cf7fc4fa09d7dc93744b3e4a937cf6370563bb4d687843c6bd5e12e6c",
    "sahara": "0x4672b1d49be8e1ff8ea0bbe42151fef4cf75ed433cc240da5e6e0bd12a6048ea",
    "vatican city": "0x812061bdd122815d2a8dea1298bc0e03a8779625bee88ee393cce765075d732d",
    
    // Category 4: Arts & Literature
    "leonardo da vinci": "0x9289069442ed277616b7932f80f14ef6ec14ce1c5dd7d4ae7eb531c215e0d998",
    "william shakespeare": "0x51345acf4421befe46499f66fb231b39f54cfdc33313ea981932d22e47e4cf92",
    "vincent van gogh": "0x51345acf4421befe46499f66fb231b39f54cfdc33313ea981932d22e47e4cf92",
    "george orwell": "0x644b70cd68e1b8dd6926cfca0c82b6c60560cb80411696777653b502d80a6e7f",
    "girl with a pearl earring": "51f3f74dfc0f87c5ac1e9bafeba64f9ac02e869f1c7c1e89409826d643f55397",
    
    // Category 5: Food & Drink
    "avocado": "0xa59f8e04087931875e5cd720c441bf6287a5af6235a70323d9f268402ece8169",
    "italy": "0xd17b173c03f969f4ff6c02fbc14ba23e644cb5194a89169c119e0788bf014b8c",
    "rice": "0x41e0fd8831d24a56368979f34e9d32a4a05cc03f1b2562f8ee1b8d46a324d0ff",
    "almond": "0x3a352852ed1d52a195874a22099c63362687f8e520fe1562ad9a5ba8422a5ed9",
    "chickpeas": "0x47a3c00e5903e80a6872ab1f9934622c82744d9ad8b366cc3d3e2ad57f0803d4"
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