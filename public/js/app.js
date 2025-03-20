// Main application logic
let currentGameId = null;
let isCreator = false;
let userAddress = null;
let refreshInterval = null;

// DOM Elements
const connectSection = document.getElementById('connect-section');
const gameListSection = document.getElementById('game-list-section');
const createGameSection = document.getElementById('create-game-section');
const gameDetailsSection = document.getElementById('game-details-section');
const gameResultsSection = document.getElementById('game-results-section');
const statusArea = document.getElementById('status-area');
const statusMessage = document.getElementById('status-message');

// Initialize the application
async function init() {
    // Connect wallet button
    document.getElementById('connect-wallet').addEventListener('click', connectWallet);
    
    // Game list buttons
    document.getElementById('refresh-games').addEventListener('click', loadGames);
    document.getElementById('create-game-btn').addEventListener('click', showCreateGameForm);
    
    // Create game form
    document.getElementById('create-game-form').addEventListener('submit', handleCreateGame);
    document.getElementById('cancel-create').addEventListener('click', hideCreateGameForm);
    
    // Game details buttons
    document.getElementById('start-game-btn').addEventListener('click', handleStartGame);
    document.getElementById('force-next-btn').addEventListener('click', handleForceNextQuestion);
    document.getElementById('end-game-btn').addEventListener('click', handleEndGame);
    document.getElementById('join-game-btn').addEventListener('click', handleJoinGame);
    document.getElementById('submit-answer-btn').addEventListener('click', handleSubmitAnswer);
    document.getElementById('back-to-games-btn').addEventListener('click', showGameList);
    document.getElementById('back-to-games-from-results-btn').addEventListener('click', showGameList);
    document.getElementById('remove-game-btn')?.addEventListener('click', handleRemoveGame);

    // Check if MetaMask is available and autoconnect
    if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            await connectWallet();
        }
    }
}

// Connect to MetaMask
async function connectWallet() {
    showStatus("Connecting to wallet...", "info");
    
    const connected = await initializeContract();
    if (connected) {
        const userInfo = await getUserInfo();
        if (userInfo) {
            userAddress = userInfo.address;
            
            // Update UI with user info
            document.getElementById('user-info').classList.remove('d-none');
            document.getElementById('user-address').textContent = shortenAddress(userAddress);
            document.getElementById('user-balance').textContent = parseFloat(userInfo.balance).toFixed(4);
            
            // Show game list
            showGameList();
            hideStatus();
        }
    }
}

// Load available games
async function loadGames() {
    showStatus("Loading games...", "info");
    
    try {
        const gameCount = await getGameCounter();
        const gamesList = document.getElementById('games-list');
        gamesList.innerHTML = '';
        
        if (gameCount === 0) {
            gamesList.innerHTML = '<p>No games available. Create a new game!</p>';
            hideStatus();
            return;
        }
        
        let activeGamesFound = false;
        const gameListHTML = document.createElement('div');
        
        for (let i = 0; i < gameCount; i++) {
            try {
                const gameInfo = await getGameInfo(i);
                
                // Only show active games
                if (gameInfo.isActive || gameInfo.hasEnded) {
                    activeGamesFound = true;
                    
                    const entryFeeMilliEth = await getEntryFeeInMilliEth(i);
                    const entryFeeEth = entryFeeMilliEth / 1000;
                    
                    const gameItem = document.createElement('div');
                    gameItem.className = 'game-item';
                    gameItem.innerHTML = `
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="mb-1">Game #${i}</h5>
                            <span class="badge ${gameInfo.hasEnded ? 'bg-secondary' : gameInfo.hasStarted ? 'bg-success' : 'bg-primary'}">
                                ${gameInfo.hasEnded ? 'Ended' : gameInfo.hasStarted ? 'In Progress' : 'Waiting'}
                            </span>
                        </div>
                        <p class="mb-1">Entry Fee: ${entryFeeEth} ETH</p>
                        <div class="d-flex justify-content-between">
                            <small>Players: ${gameInfo.currentPlayers} / ${gameInfo.maxPlayers}</small>
                            <small>Prize: ${ethers.utils.formatEther(gameInfo.totalPrize)} ETH</small>
                        </div>
                    `;
                    
                    gameItem.addEventListener('click', () => showGameDetails(i));
                    gameListHTML.appendChild(gameItem);
                }
            } catch (error) {
                console.error(`Error loading game ${i}:`, error);
            }
        }
        
        if (!activeGamesFound) {
            gamesList.innerHTML = '<p>No active games found. Create a new game!</p>';
        } else {
            gamesList.appendChild(gameListHTML);
        }
        
        hideStatus();
    } catch (error) {
        console.error("Error loading games:", error);
        showStatus("Failed to load games: " + error.message, "error");
    }
}

// Show game details
async function showGameDetails(gameId) {
    showStatus("Loading game details...", "info");
    
    try {
        currentGameId = gameId;
        const gameInfo = await getGameInfo(gameId);
        const entryFeeMilliEth = await getEntryFeeInMilliEth(gameId);
        const entryFeeEth = entryFeeMilliEth / 1000;
        
        hideAllSections();
        gameDetailsSection.classList.remove('d-none');
        
        // Check if user is creator
        isCreator = (gameInfo.creator.toLowerCase() === userAddress.toLowerCase());
        
        // Update game info display
        const gameInfoDiv = document.getElementById('game-info');
        gameInfoDiv.innerHTML = `
            <h3>Game #${gameId}</h3>
            <div class="mb-3">
                <div class="badge ${gameInfo.hasEnded ? 'bg-secondary' : gameInfo.hasStarted ? 'bg-success' : 'bg-primary'} mb-2">
                    ${gameInfo.hasEnded ? 'Ended' : gameInfo.hasStarted ? 'In Progress' : 'Waiting for Players'}
                </div>
                <p><strong>Entry Fee:</strong> ${entryFeeEth} ETH</p>
                <p><strong>Players:</strong> ${gameInfo.currentPlayers} / ${gameInfo.maxPlayers}</p>
                <p><strong>Prize Pool:</strong> ${ethers.utils.formatEther(gameInfo.totalPrize)} ETH</p>
                <p><strong>Creator:</strong> ${shortenAddress(gameInfo.creator)}</p>
                ${gameInfo.hasStarted ? `<p><strong>Question:</strong> ${gameInfo.currentQuestionIndex + 1}/5</p>` : ''}
                ${gameInfo.hasEnded && gameInfo.winner !== ethers.constants.AddressZero ? 
                    `<p><strong>Winner:</strong> ${shortenAddress(gameInfo.winner)}</p>` : ''}
            </div>
        `;
        
        // Handle controls based on user role and game state
        const creatorControls = document.getElementById('creator-controls');
        const playerControls = document.getElementById('player-controls');
        
        if (isCreator) {
            creatorControls.classList.remove('d-none');
            playerControls.classList.add('d-none');
            
            // Update button states
            document.getElementById('start-game-btn').disabled = gameInfo.hasStarted || gameInfo.hasEnded;
            document.getElementById('end-game-btn').disabled = !gameInfo.hasStarted || gameInfo.hasEnded;
            document.getElementById('force-next-btn').disabled = !gameInfo.hasStarted || gameInfo.hasEnded;

            const removeGameBtn = document.createElement('button');
            removeGameBtn.id = 'remove-game-btn';
            removeGameBtn.className = 'btn btn-danger ms-2';
            removeGameBtn.textContent = 'Remove Game';
            removeGameBtn.disabled = gameInfo.hasStarted;
            removeGameBtn.addEventListener('click', handleRemoveGame);
            
            document.getElementById('creator-controls').appendChild(removeGameBtn);
        } else {
            creatorControls.classList.add('d-none');
            playerControls.classList.remove('d-none');
            
            const hasJoined = await hasPlayerJoined(gameId, userAddress);
            const joinGameDiv = document.getElementById('join-game-div');
            const answerQuestionDiv = document.getElementById('answer-question-div');
            
            // Show join button or question section
            if (hasJoined) {
                joinGameDiv.classList.add('d-none');
                
                if (gameInfo.hasStarted && !gameInfo.hasEnded) {
                    answerQuestionDiv.classList.remove('d-none');
                    await loadCurrentQuestion(gameId, gameInfo.currentQuestionIndex);
                } else {
                    answerQuestionDiv.classList.add('d-none');
                }
            } else {
                if (gameInfo.hasStarted || gameInfo.hasEnded || gameInfo.currentPlayers >= gameInfo.maxPlayers) {
                    joinGameDiv.classList.add('d-none');
                } else {
                    joinGameDiv.classList.remove('d-none');
                    document.getElementById('game-entry-fee').textContent = entryFeeEth;
                }
                answerQuestionDiv.classList.add('d-none');
            }
        }
        
        // Handle game results section
        if (gameInfo.hasEnded) {
            showGameResults(gameId, gameInfo);
        }
        
        // Start auto-refresh for in-progress games
        startGameRefresh(gameId, gameInfo);
        
        hideStatus();
    } catch (error) {
        console.error("Error showing game details:", error);
        showStatus("Failed to load game details: " + error.message, "error");
    }
}

// Load current question
async function loadCurrentQuestion(gameId, questionIndex) {
    try {
        console.log('Loading question for Game ID:', gameId);
        console.log('Question Index:', questionIndex);

        const question = await getCurrentQuestion(gameId);
        console.log('Raw Question Object:', question);

        // Log the actual values
        console.log('Category ID:', question.categoryId);
        console.log('Question Hash:', question.questionHash);

        const category = getCategoryById(question.categoryId);
        console.log('Category:', category);

        const questionText = getQuestionByHash(question.questionHash);
        console.log('Question Text:', questionText);
        
        // Update question display
        document.getElementById('question-number').textContent = questionIndex + 1;
        
        const categoryBadge = document.getElementById('category-badge');
        categoryBadge.textContent = category.name;
        categoryBadge.className = `category-badge ${category.class}`;
        
        document.getElementById('current-question').textContent = questionText;
        document.getElementById('player-answer').value = '';
        
    } catch (error) {
        console.error("Detailed error loading question:", error);
        document.getElementById('current-question').textContent = "Error loading question: " + error.message;
        showStatus("Failed to load current question: " + error.message, "error");
    }
}

// Start auto-refresh for game state
function startGameRefresh(gameId, gameInfo) {
    // Clear any existing interval
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
    
    // Only set up refresh for in-progress games
    if (gameInfo.hasStarted && !gameInfo.hasEnded) {
        refreshInterval = setInterval(async () => {
            try {
                const updatedInfo = await getGameInfo(gameId);
                
                // Check if question index changed
                if (updatedInfo.currentQuestionIndex !== gameInfo.currentQuestionIndex) {
                    gameInfo.currentQuestionIndex = updatedInfo.currentQuestionIndex;
                    
                    // Update the question display if player is answering
                    if (!isCreator && await hasPlayerJoined(gameId, userAddress)) {
                        await loadCurrentQuestion(gameId, updatedInfo.currentQuestionIndex);
                    }
                }
                
                // Check if game ended
                if (updatedInfo.hasEnded && !gameInfo.hasEnded) {
                    gameInfo.hasEnded = true;
                    showGameDetails(gameId);
                }
            } catch (error) {
                console.error("Error in refresh:", error);
            }
        }, 5000); // Refresh every 5 seconds
    }
}

// Show game results
function showGameResults(gameId, gameInfo) {
    gameResultsSection.classList.remove('d-none');
    const resultsInfo = document.getElementById('results-info');
    
    if (gameInfo.winner === ethers.constants.AddressZero) {
        resultsInfo.innerHTML = `
            <div class="alert alert-warning">
                <h4>Game Over!</h4>
                <p>No winner in this game. All players scored 0 points.</p>
                <p>Prize pool: ${ethers.utils.formatEther(gameInfo.totalPrize)} ETH</p>
            </div>
        `;
    } else {
        const isWinner = gameInfo.winner.toLowerCase() === userAddress.toLowerCase();
        
        resultsInfo.innerHTML = `
            <div class="alert ${isWinner ? 'alert-success' : 'alert-info'}">
                <h4>${isWinner ? '🎉 Congratulations! You Won! 🎉' : 'Game Over!'}</h4>
                <p>Winner: ${shortenAddress(gameInfo.winner)}</p>
                <p>Prize: ${ethers.utils.formatEther(gameInfo.totalPrize)} ETH</p>
            </div>
        `;
    }
}

// Handle form submission for creating a game
async function handleCreateGame(e) {
    e.preventDefault();
    
    const entryFeeMilliEth = parseInt(document.getElementById('entry-fee').value);
    const maxPlayers = parseInt(document.getElementById('max-players').value);
    
    if (isNaN(entryFeeMilliEth) || entryFeeMilliEth <= 0) {
        showStatus("Please enter a valid entry fee", "warning");
        return;
    }
    
    if (isNaN(maxPlayers) || maxPlayers < 2 || maxPlayers > 20) {
        showStatus("Please enter a valid number of players (2-20)", "warning");
        return;
    }
    
    showStatus("Creating new game...", "info");
    
    try {
        const gameId = await createNewGame(entryFeeMilliEth, maxPlayers);
        showStatus(`Game #${gameId} created successfully!`, "success");
        
        // Reset form and show game details
        document.getElementById('create-game-form').reset();
        hideCreateGameForm();
        setTimeout(() => showGameDetails(gameId), 1000);
    } catch (error) {
        console.error("Error creating game:", error);
        showStatus("Failed to create game: " + error.message, "error");
    }
}

// Handle joining a game
async function handleJoinGame() {
    console.log('Join Game clicked');
    console.log('Current Game ID:', currentGameId);
    console.log('User Address:', userAddress);

    if (currentGameId === null || currentGameId === undefined) {
        showStatus('No game selected', 'warning');
        return;
    }
    
    try {
        const gameInfo = await getGameInfo(currentGameId);
        console.log('Game Info:', gameInfo);

        const entryFeeMilliEth = await getEntryFeeInMilliEth(currentGameId);
        console.log('Entry Fee (milliETH):', entryFeeMilliEth);
        
        const entryFeeWei = ethers.utils.parseEther((entryFeeMilliEth / 1000).toString());
        console.log('Entry Fee (Wei):', entryFeeWei.toString());
        
        // Additional checks
        if (gameInfo.hasStarted) {
            showStatus('Game has already started', 'warning');
            return;
        }

        if (gameInfo.currentPlayers >= gameInfo.maxPlayers) {
            showStatus('Game is full', 'warning');
            return;
        }
        
        showStatus(`Joining game... Please confirm in MetaMask.`, "info");
        
        await joinGame(currentGameId, entryFeeWei);
        showStatus("Joined game successfully!", "success");
        
        // Reload game details
        setTimeout(() => showGameDetails(currentGameId), 1000);
    } catch (error) {
        console.error("Full error in handleJoinGame:", error);
        showStatus(`Failed to join game: ${error.message}`, "error");
    }
}

// Handle starting a game
async function handleStartGame() {
    if (!currentGameId) return;
    
    showStatus("Starting game...", "info");
    
    try {
        await startGame(currentGameId);
        showStatus("Game started successfully!", "success");
        
        // Reload game details
        setTimeout(() => showGameDetails(currentGameId), 1000);
    } catch (error) {
        console.error("Error starting game:", error);
        showStatus("Failed to start game: " + error.message, "error");
    }
}

// Handle forcing next question
async function handleForceNextQuestion() {
    if (!currentGameId) return;
    
    showStatus("Moving to next question...", "info");
    
    try {
        await forceNextQuestion(currentGameId);
        showStatus("Moved to next question!", "success");
        
        // Reload game details
        setTimeout(() => showGameDetails(currentGameId), 1000);
    } catch (error) {
        console.error("Error forcing next question:", error);
        showStatus("Failed to move to next question: " + error.message, "error");
    }
}

// Handle ending a game
async function handleEndGame() {
    if (!currentGameId) return;
    
    showStatus("Ending game...", "info");
    
    try {
        await endGame(currentGameId);
        showStatus("Game ended successfully!", "success");
        
        // Reload game details
        setTimeout(() => showGameDetails(currentGameId), 1000);
    } catch (error) {
        console.error("Error ending game:", error);
        showStatus("Failed to end game: " + error.message, "error");
    }
}

// Handle submitting an answer
async function handleSubmitAnswer() {
    if (!currentGameId) return;
    
    const answerText = document.getElementById('player-answer').value.trim();
    
    if (!answerText) {
        showStatus("Please enter your answer", "warning");
        return;
    }
    
    showStatus("Submitting answer...", "info");
    
    try {
        // Hash the answer using our helper function
        const answerHash = hashAnswer(answerText);
        
        await submitAnswer(currentGameId, answerHash);
        showStatus("Answer submitted successfully!", "success");
        
        // Clear the input
        document.getElementById('player-answer').value = '';
        
        // Reload game details
        setTimeout(() => showGameDetails(currentGameId), 1000);
    } catch (error) {
        console.error("Error submitting answer:", error);
        showStatus("Failed to submit answer: " + error.message, "error");
    }
}

// Show the game list
function showGameList() {
    hideAllSections();
    gameListSection.classList.remove('d-none');
    loadGames();
    
    // Clear any refresh interval
    if (refreshInterval) {
        clearInterval(refreshInterval);
        refreshInterval = null;
    }
}

// Show the create game form
function showCreateGameForm() {
    hideAllSections();
    createGameSection.classList.remove('d-none');
}

// Hide the create game form
function hideCreateGameForm() {
    createGameSection.classList.add('d-none');
    gameListSection.classList.remove('d-none');
}

// Hide all sections
function hideAllSections() {
    connectSection.classList.add('d-none');
    gameListSection.classList.add('d-none');
    createGameSection.classList.add('d-none');
    gameDetailsSection.classList.add('d-none');
    gameResultsSection.classList.add('d-none');
}

// Show status message
function showStatus(message, type = 'info') {
    statusArea.classList.remove('d-none');
    statusMessage.textContent = message;
    
    // Reset all status classes
    statusMessage.className = 'alert';
    
    // Add appropriate class
    switch (type) {
        case 'success':
            statusMessage.classList.add('alert-success');
            break;
        case 'error':
            statusMessage.classList.add('alert-danger');
            break;
        case 'warning':
            statusMessage.classList.add('alert-warning');
            break;
        default:
            statusMessage.classList.add('alert-info');
    }
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(hideStatus, 5000);
    }
}

// Handle removing a game
async function handleRemoveGame() {
    if (!currentGameId) return;
    
    if (!isCreator) {
        showStatus("Only the game creator can remove the game", "warning");
        return;
    }
    
    showStatus("Removing game...", "info");
    
    try {
        await removeGame(currentGameId);
        showStatus("Game removed successfully!", "success");
        
        // Return to game list
        showGameList();
    } catch (error) {
        console.error("Error removing game:", error);
        showStatus("Failed to remove game: " + error.message, "error");
    }
}

// Hide status message
function hideStatus() {
    statusArea.classList.add('d-none');
}

// Shorten address for display
function shortenAddress(address) {
    return address.substring(0, 6) + '...' + address.substring(address.length - 4);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);