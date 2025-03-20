// Deployed contract address on Sepolia testnet
const CONTRACT_ADDRESS = "0xa7B5E39CA6C545C3151118719910ee6881FFAA56";

// Contract ABI - this is the interface that tells the frontend how to interact with your contract
const CONTRACT_ABI = [
    {"type":"event","name":"GameCreated","inputs":[{"name":"gameId","type":"uint256","components":null,"internalType":null,"indexed":false},{"name":"creator","type":"address","components":null,"internalType":null,"indexed":false},{"name":"entryFee","type":"uint256","components":null,"internalType":null,"indexed":false},{"name":"maxPlayers","type":"uint256","components":null,"internalType":null,"indexed":false}],"anonymous":false},
    {"type":"event","name":"PlayerJoined","inputs":[{"name":"gameId","type":"uint256","components":null,"internalType":null,"indexed":false},{"name":"player","type":"address","components":null,"internalType":null,"indexed":false}],"anonymous":false},
    {"type":"event","name":"GameStarted","inputs":[{"name":"gameId","type":"uint256","components":null,"internalType":null,"indexed":false},{"name":"startTime","type":"uint256","components":null,"internalType":null,"indexed":false}],"anonymous":false},
    {"type":"event","name":"AnswerSubmitted","inputs":[{"name":"gameId","type":"uint256","components":null,"internalType":null,"indexed":false},{"name":"player","type":"address","components":null,"internalType":null,"indexed":false},{"name":"questionId","type":"uint256","components":null,"internalType":null,"indexed":false}],"anonymous":false},
    {"type":"event","name":"GameEnded","inputs":[{"name":"gameId","type":"uint256","components":null,"internalType":null,"indexed":false},{"name":"winner","type":"address","components":null,"internalType":null,"indexed":false},{"name":"prize","type":"uint256","components":null,"internalType":null,"indexed":false}],"anonymous":false},
    {"type":"constructor","stateMutability":"nonpayable","inputs":[]},
    {"type":"function","name":"createGame","stateMutability":"nonpayable","inputs":[{"name":"entryFeeMilliEth","type":"uint256","components":null,"internalType":null},{"name":"maxPlayers","type":"uint256","components":null,"internalType":null}],"outputs":[{"name":"","type":"uint256","components":null,"internalType":null}]},
    {"type":"function","name":"joinGame","stateMutability":"payable","inputs":[{"name":"gameId","type":"uint256","components":null,"internalType":null}],"outputs":[]},
    {"type":"function","name":"getEntryFeeInMilliEth","stateMutability":"view","inputs":[{"name":"gameId","type":"uint256","components":null,"internalType":null}],"outputs":[{"name":"","type":"uint256","components":null,"internalType":null}]},
    {"type":"function","name":"startGame","stateMutability":"nonpayable","inputs":[{"name":"gameId","type":"uint256","components":null,"internalType":null}],"outputs":[]},
    {"type":"function","name":"submitAnswer","stateMutability":"nonpayable","inputs":[{"name":"gameId","type":"uint256","components":null,"internalType":null},{"name":"answer","type":"bytes32","components":null,"internalType":null}],"outputs":[]},
    {"type":"function","name":"forceNextQuestion","stateMutability":"nonpayable","inputs":[{"name":"gameId","type":"uint256","components":null,"internalType":null}],"outputs":[]},
    {"type":"function","name":"endGame","stateMutability":"nonpayable","inputs":[{"name":"gameId","type":"uint256","components":null,"internalType":null}],"outputs":[]},
    {"type":"function","name":"getGameInfo","stateMutability":"view","inputs":[{"name":"gameId","type":"uint256","components":null,"internalType":null}],"outputs":[{"name":"","type":"address","components":null,"internalType":null},{"name":"","type":"uint256","components":null,"internalType":null},{"name":"","type":"uint256","components":null,"internalType":null},{"name":"","type":"uint256","components":null,"internalType":null},{"name":"","type":"bool","components":null,"internalType":null},{"name":"","type":"bool","components":null,"internalType":null},{"name":"","type":"bool","components":null,"internalType":null},{"name":"","type":"uint256","components":null,"internalType":null},{"name":"","type":"address","components":null,"internalType":null},{"name":"","type":"uint256","components":null,"internalType":null}]},
    {"type":"function","name":"getPlayerScore","stateMutability":"view","inputs":[{"name":"gameId","type":"uint256","components":null,"internalType":null},{"name":"player","type":"address","components":null,"internalType":null}],"outputs":[{"name":"","type":"uint256","components":null,"internalType":null}]},
    {"type":"function","name":"getCurrentQuestion","stateMutability":"view","inputs":[{"name":"gameId","type":"uint256","components":null,"internalType":null}],"outputs":[{"name":"","type":"uint8","components":null,"internalType":null},{"name":"","type":"bytes32","components":null,"internalType":null}]},
    {"type":"function","name":"getCurrentQuestionCategory","stateMutability":"view","inputs":[{"name":"gameId","type":"uint256","components":null,"internalType":null}],"outputs":[{"name":"","type":"uint8","components":null,"internalType":null}]},
    {"type":"function","name":"emergencyWithdraw","stateMutability":"nonpayable","inputs":[],"outputs":[]},
    {"type":"function","name":"owner","stateMutability":"view","inputs":[],"outputs":[{"name":"","type":"address","components":null,"internalType":null}]},
    {"type":"function","name":"games","stateMutability":"view","inputs":[{"name":"arg0","type":"uint256","components":null,"internalType":null}],"outputs":[{"name":"","type":"tuple","components":[{"name":"creator","type":"address","components":null,"internalType":null},{"name":"entryFee","type":"uint256","components":null,"internalType":null},{"name":"maxPlayers","type":"uint256","components":null,"internalType":null},{"name":"currentPlayers","type":"uint256","components":null,"internalType":null},{"name":"isActive","type":"bool","components":null,"internalType":null},{"name":"hasStarted","type":"bool","components":null,"internalType":null},{"name":"hasEnded","type":"bool","components":null,"internalType":null},{"name":"totalPrize","type":"uint256","components":null,"internalType":null},{"name":"winner","type":"address","components":null,"internalType":null},{"name":"currentQuestionIndex","type":"uint256","components":null,"internalType":null},{"name":"questionCount","type":"uint256","components":null,"internalType":null}],"internalType":null}]},
    {"type":"function","name":"gameQuestions","stateMutability":"view","inputs":[{"name":"arg0","type":"uint256","components":null,"internalType":null},{"name":"arg1","type":"uint256","components":null,"internalType":null}],"outputs":[{"name":"","type":"tuple","components":[{"name":"category","type":"uint8","components":null,"internalType":null},{"name":"questionHash","type":"bytes32","components":null,"internalType":null},{"name":"answerHash","type":"bytes32","components":null,"internalType":null}],"internalType":null}]},
    {"type":"function","name":"playerInfo","stateMutability":"view","inputs":[{"name":"arg0","type":"uint256","components":null,"internalType":null},{"name":"arg1","type":"address","components":null,"internalType":null}],"outputs":[{"name":"","type":"tuple","components":[{"name":"hasJoined","type":"bool","components":null,"internalType":null},{"name":"score","type":"uint256","components":null,"internalType":null},{"name":"lastAnswered","type":"uint256","components":null,"internalType":null}],"internalType":null}]},
    {"type":"function","name":"playersInGame","stateMutability":"view","inputs":[{"name":"arg0","type":"uint256","components":null,"internalType":null},{"name":"arg1","type":"uint256","components":null,"internalType":null}],"outputs":[{"name":"","type":"address","components":null,"internalType":null}]},
    {"type":"function","name":"gameCounter","stateMutability":"view","inputs":[],"outputs":[{"name":"","type":"uint256","components":null,"internalType":null}]},
    {"type":"function","name":"questionBank","stateMutability":"view","inputs":[{"name":"arg0","type":"uint256","components":null,"internalType":null}],"outputs":[{"name":"","type":"tuple","components":[{"name":"category","type":"uint8","components":null,"internalType":null},{"name":"questionHash","type":"bytes32","components":null,"internalType":null},{"name":"answerHash","type":"bytes32","components":null,"internalType":null}],"internalType":null}]},
    {"type":"function","name":"questionBankSize","stateMutability":"view","inputs":[],"outputs":[{"name":"","type":"uint256","components":null,"internalType":null}]}
];

// Global variables for contract interaction
let provider;
let signer;
let contract;

/**
 * Initialize connection to Ethereum provider and contract
 */
async function initializeContract() {
    // Check if MetaMask is installed
    if (window.ethereum) {
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Initialize ethers provider and signer
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            
            // Create contract instance
            contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            
            // Check if we're on the correct network (Sepolia)
            const network = await provider.getNetwork();
            if (network.chainId !== 11155111) { // Sepolia chainId
                document.getElementById('network-info').classList.remove('d-none');
                document.getElementById('network-info').classList.add('alert-warning');
                document.getElementById('network-name').textContent = network.name;
                document.getElementById('network-info').innerHTML += '<br>Please switch to Sepolia testnet in MetaMask.';
                return false;
            }
            
            document.getElementById('network-info').classList.remove('d-none');
            document.getElementById('network-name').textContent = 'Sepolia Testnet';
            
            return true;
        } catch (error) {
            console.error("Error connecting to Ethereum:", error);
            showStatus("Failed to connect to Ethereum: " + error.message, "error");
            return false;
        }
    } else {
        showStatus("Please install MetaMask to use this dApp!", "error");
        return false;
    }
}

/**
 * Get user's address and balance
 */
async function getUserInfo() {
    if (!signer) return null;
    
    try {
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        const ethBalance = ethers.utils.formatEther(balance);
        
        return {
            address,
            balance: ethBalance
        };
    } catch (error) {
        console.error("Error getting user info:", error);
        return null;
    }
}

/**
 * Create a new trivia game
 * @param {number} entryFeeMilliEth - Entry fee in milliETH
 * @param {number} maxPlayers - Maximum number of players
 */
async function createNewGame(entryFeeMilliEth, maxPlayers) {
    try {
        const tx = await contract.createGame(entryFeeMilliEth, maxPlayers);
        const receipt = await tx.wait();
        
        // Find the GameCreated event in the transaction receipt
        const event = receipt.events.find(e => e.event === 'GameCreated');
        if (event) {
            const gameId = event.args.gameId.toNumber();
            return gameId;
        }
        
        return null;
    } catch (error) {
        console.error("Error creating game:", error);
        throw error;
    }
}

/**
 * Join an existing game
 * @param {number} gameId - ID of the game to join
 * @param {string} entryFeeWei - Entry fee in wei
 */
async function joinGame(gameId, entryFeeWei) {
    try {
        const tx = await contract.joinGame(gameId, {
            value: entryFeeWei
        });
        await tx.wait();
        return true;
    } catch (error) {
        console.error("Error joining game:", error);
        throw error;
    }
}

/**
 * Start a game (creator only)
 * @param {number} gameId - ID of the game to start
 */
async function startGame(gameId) {
    try {
        const tx = await contract.startGame(gameId);
        await tx.wait();
        return true;
    } catch (error) {
        console.error("Error starting game:", error);
        throw error;
    }
}

/**
 * Submit an answer to a question
 * @param {number} gameId - ID of the game
 * @param {string} answerHash - Hashed answer
 */
async function submitAnswer(gameId, answerHash) {
    try {
        const tx = await contract.submitAnswer(gameId, answerHash);
        await tx.wait();
        return true;
    } catch (error) {
        console.error("Error submitting answer:", error);
        throw error;
    }
}

/**
 * Force the game to move to the next question (creator only)
 * @param {number} gameId - ID of the game
 */
async function forceNextQuestion(gameId) {
    try {
        const tx = await contract.forceNextQuestion(gameId);
        await tx.wait();
        return true;
    } catch (error) {
        console.error("Error forcing next question:", error);
        throw error;
    }
}

/**
 * End the game (creator only)
 * @param {number} gameId - ID of the game
 */
async function endGame(gameId) {
    try {
        const tx = await contract.endGame(gameId);
        await tx.wait();
        return true;
    } catch (error) {
        console.error("Error ending game:", error);
        throw error;
    }
}

/**
 * Get game information
 * @param {number} gameId - ID of the game
 */
async function getGameInfo(gameId) {
    try {
        const info = await contract.getGameInfo(gameId);
        return {
            creator: info[0],
            entryFee: info[1],
            maxPlayers: info[2].toNumber(),
            currentPlayers: info[3].toNumber(),
            isActive: info[4],
            hasStarted: info[5],
            hasEnded: info[6],
            totalPrize: info[7],
            winner: info[8],
            currentQuestionIndex: info[9].toNumber()
        };
    } catch (error) {
        console.error("Error getting game info:", error);
        throw error;
    }
}

/**
 * Get entry fee in milliETH
 * @param {number} gameId - ID of the game
 */
async function getEntryFeeInMilliEth(gameId) {
    try {
        const fee = await contract.getEntryFeeInMilliEth(gameId);
        return fee.toNumber();
    } catch (error) {
        console.error("Error getting entry fee:", error);
        throw error;
    }
}

/**
 * Get player's score
 * @param {number} gameId - ID of the game
 * @param {string} playerAddress - Player's address
 */
async function getPlayerScore(gameId, playerAddress) {
    try {
        const score = await contract.getPlayerScore(gameId, playerAddress);
        return score.toNumber();
    } catch (error) {
        console.error("Error getting player score:", error);
        throw error;
    }
}

/**
 * Get current question
 * @param {number} gameId - ID of the game
 */
async function getCurrentQuestion(gameId) {
    try {
        const [categoryId, questionHash] = await contract.getCurrentQuestion(gameId);
        return {
            categoryId: categoryId,
            questionHash: questionHash
        };
    } catch (error) {
        console.error("Error getting current question:", error);
        throw error;
    }
}

/**
 * Get game counter (total number of games)
 */
async function getGameCounter() {
    try {
        const counter = await contract.gameCounter();
        return counter.toNumber();
    } catch (error) {
        console.error("Error getting game counter:", error);
        throw error;
    }
}

/**
 * Check if address has joined a game
 * @param {number} gameId - ID of the game
 * @param {string} address - Player address to check
 */
async function hasPlayerJoined(gameId, address) {
    try {
        const playerInfo = await contract.playerInfo(gameId, address);
        return playerInfo.hasJoined;
    } catch (error) {
        console.error("Error checking if player joined:", error);
        return false;
    }
}