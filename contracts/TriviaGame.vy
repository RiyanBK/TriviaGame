# @version ^0.3.7

# Event definitions
event GameCreated:
    gameId: uint256
    creator: address
    entryFee: uint256
    maxPlayers: uint256

event PlayerJoined:
    gameId: uint256
    player: address

event GameStarted:
    gameId: uint256
    startTime: uint256

event AnswerSubmitted:
    gameId: uint256
    player: address
    questionId: uint256

event GameEnded:
    gameId: uint256
    winner: address
    prize: uint256

# Question categories
# 0: History
# 1: Science
# 2: Entertainment
# 3: Geography
# 4: Arts & Literature
# 5: Food & Drink

# Struct definitions
struct Game:
    creator: address
    entryFee: uint256  # Stored in Wei
    maxPlayers: uint256
    currentPlayers: uint256
    isActive: bool
    hasStarted: bool
    hasEnded: bool
    totalPrize: uint256  # Stored in Wei
    winner: address
    currentQuestionIndex: uint256
    questionCount: uint256

struct Question:
    category: uint8
    questionHash: bytes32
    answerHash: bytes32

struct PlayerInfo:
    hasJoined: bool
    score: uint256
    lastAnswered: uint256

# Contract state variables
owner: public(address)
games: public(HashMap[uint256, Game])
gameQuestions: public(HashMap[uint256, HashMap[uint256, Question]])
playerInfo: public(HashMap[uint256, HashMap[address, PlayerInfo]])
playersInGame: public(HashMap[uint256, HashMap[uint256, address]])
gameCounter: public(uint256)
questionBank: public(HashMap[uint256, Question])
questionBankSize: public(uint256)

# Maximum number of players in any game
MAX_PLAYERS: constant(uint256) = 20

# Seed for pseudorandom number generation
randomSeed: uint256

# Contract constructor
@external
def __init__():
    self.owner = msg.sender
    self.gameCounter = 0
    self.questionBankSize = 0
    self.randomSeed = block.timestamp

    # Initialize question bank
    self._initializeQuestionBank()

# Private function to initialize the question bank
@internal
def _initializeQuestionBank():
    # Category 0: History
    self._addQuestionToBank(0, keccak256("Who was the first President of the United States?"), keccak256("George Washington"))
    self._addQuestionToBank(0, keccak256("In which year did World War II end?"), keccak256("1945"))
    self._addQuestionToBank(0, keccak256("Which ancient civilization built the Machu Picchu complex?"), keccak256("Inca"))
    self._addQuestionToBank(0, keccak256("Who wrote the Declaration of Independence?"), keccak256("Thomas Jefferson"))
    self._addQuestionToBank(0, keccak256("Which empire was ruled by Genghis Khan?"), keccak256("Mongol Empire"))
    
    # Category 1: Science
    self._addQuestionToBank(1, keccak256("What is the chemical symbol for gold?"), keccak256("Au"))
    self._addQuestionToBank(1, keccak256("What's the nearest planet to the Sun?"), keccak256("Mercury"))
    self._addQuestionToBank(1, keccak256("What is the hardest natural substance on Earth?"), keccak256("Diamond"))
    self._addQuestionToBank(1, keccak256("What is the largest organ in the human body?"), keccak256("Skin"))
    self._addQuestionToBank(1, keccak256("Who developed the theory of relativity?"), keccak256("Albert Einstein"))
    
    # Category 2: Entertainment
    self._addQuestionToBank(2, keccak256("Who played Jack in the movie Titanic?"), keccak256("Leonardo DiCaprio"))
    self._addQuestionToBank(2, keccak256("What was the first feature-length animated film?"), keccak256("Snow White and the Seven Dwarfs"))
    self._addQuestionToBank(2, keccak256("Which band released the album 'Abbey Road'?"), keccak256("The Beatles"))
    self._addQuestionToBank(2, keccak256("Who created Mickey Mouse?"), keccak256("Walt Disney"))
    self._addQuestionToBank(2, keccak256("Which TV show features characters named Walter White and Jesse Pinkman?"), keccak256("Breaking Bad"))
    
    # Category 3: Geography
    self._addQuestionToBank(3, keccak256("What is the capital of Japan?"), keccak256("Tokyo"))
    self._addQuestionToBank(3, keccak256("Which country is home to the Great Barrier Reef?"), keccak256("Australia"))
    self._addQuestionToBank(3, keccak256("What is the longest river in the world?"), keccak256("Nile"))
    self._addQuestionToBank(3, keccak256("Which desert is the largest in the world?"), keccak256("Sahara"))
    self._addQuestionToBank(3, keccak256("What is the smallest country in the world?"), keccak256("Vatican City"))
    
    # Category 4: Arts & Literature
    self._addQuestionToBank(4, keccak256("Who painted the Mona Lisa?"), keccak256("Leonardo da Vinci"))
    self._addQuestionToBank(4, keccak256("Who wrote 'Romeo and Juliet'?"), keccak256("William Shakespeare"))
    self._addQuestionToBank(4, keccak256("Which artist cut off his own ear?"), keccak256("Vincent van Gogh"))
    self._addQuestionToBank(4, keccak256("Who wrote '1984'?"), keccak256("George Orwell"))
    self._addQuestionToBank(4, keccak256("What is the name of the famous painting of a woman with a pearl earring?"), keccak256("Girl with a Pearl Earring"))
    
    # Category 5: Food & Drink
    self._addQuestionToBank(5, keccak256("What is the main ingredient in guacamole?"), keccak256("Avocado"))
    self._addQuestionToBank(5, keccak256("Which country is known for inventing pizza?"), keccak256("Italy"))
    self._addQuestionToBank(5, keccak256("What grain is used to make sake?"), keccak256("Rice"))
    self._addQuestionToBank(5, keccak256("Which nut is used to make marzipan?"), keccak256("Almond"))
    self._addQuestionToBank(5, keccak256("What is the main ingredient in traditional hummus?"), keccak256("Chickpeas"))

# Helper function to add a question to the bank
@internal
def _addQuestionToBank(category: uint8, questionHash: bytes32, answerHash: bytes32):
    self.questionBank[self.questionBankSize] = Question({
        category: category,
        questionHash: questionHash,
        answerHash: answerHash
    })
    self.questionBankSize += 1

# Create a new trivia game with entry fee in ETH units of 0.001 ETH
# Input 1 for 0.001 ETH, 10 for 0.01 ETH, 100 for 0.1 ETH, 1000 for 1 ETH
@external
def createGame(entryFeeMilliEth: uint256, maxPlayers: uint256) -> uint256:
    assert maxPlayers <= MAX_PLAYERS, "Too many players"
    gameId: uint256 = self.gameCounter
    
    # Convert milliEth (0.001 ETH units) to Wei
    # 1 milliEth = 0.001 ETH = 10^15 Wei
    entryFeeWei: uint256 = entryFeeMilliEth * 10**15
    
    self.games[gameId] = Game({
        creator: msg.sender,
        entryFee: entryFeeWei,
        maxPlayers: maxPlayers,
        currentPlayers: 0,
        isActive: True,
        hasStarted: False,
        hasEnded: False,
        totalPrize: 0,
        winner: ZERO_ADDRESS,
        currentQuestionIndex: 0,
        questionCount: 5  # Each game has 5 questions
    })
    
    log GameCreated(gameId, msg.sender, entryFeeWei, maxPlayers)
    self.gameCounter += 1
    return gameId

# Join a game by paying the entry fee
@external
@payable
def joinGame(gameId: uint256):
    assert self.games[gameId].isActive, "Game is not active"
    assert not self.games[gameId].hasStarted, "Game has already started"
    assert not self.playerInfo[gameId][msg.sender].hasJoined, "Player already joined"
    assert self.games[gameId].currentPlayers < self.games[gameId].maxPlayers, "Game is full"
    assert msg.value == self.games[gameId].entryFee, "Incorrect entry fee"
    
    self.playerInfo[gameId][msg.sender] = PlayerInfo({
        hasJoined: True,
        score: 0,
        lastAnswered: 0
    })
    
    # Add player to the game players list
    self.playersInGame[gameId][self.games[gameId].currentPlayers] = msg.sender
    self.games[gameId].currentPlayers += 1
    self.games[gameId].totalPrize += msg.value
    
    log PlayerJoined(gameId, msg.sender)

# Get entry fee in milliEth units (1 = 0.001 ETH, 1000 = 1 ETH)
@view
@external
def getEntryFeeInMilliEth(gameId: uint256) -> uint256:
    return self.games[gameId].entryFee / 10**15

# Start the game and select random questions (only game creator)
@external
def startGame(gameId: uint256):
    assert self.games[gameId].creator == msg.sender, "Only game creator can start game"
    assert self.games[gameId].isActive, "Game is not active"
    assert not self.games[gameId].hasStarted, "Game has already started"
    assert self.games[gameId].currentPlayers > 0, "No players have joined"
    
    # Select 5 random questions from the question bank
    self._selectRandomQuestions(gameId)
    
    self.games[gameId].hasStarted = True
    
    log GameStarted(gameId, block.timestamp)

# Private function to select random questions for a game
@internal
def _selectRandomQuestions(gameId: uint256):
    # Simple pseudo-random selection logic
    # In a production environment, use a more secure randomness source
    seed: uint256 = self.randomSeed + gameId + block.timestamp
    
    for i in range(5):  # Select 5 questions
        # Generate pseudo-random index
        randomIndex: uint256 = self._getRandomNumber(seed + i, self.questionBankSize)
        
        # Get the question from the bank
        question: Question = self.questionBank[randomIndex]
        
        # Add question to the game
        self.gameQuestions[gameId][i] = question
    
    # Update seed for next game
    self.randomSeed = seed

# Simple pseudo-random number generator
@internal
@view
def _getRandomNumber(seed: uint256, maxValue: uint256) -> uint256:
    return (seed * 1103515245 + 12345) % maxValue

# Submit an answer to a question
@external
def submitAnswer(gameId: uint256, answer: bytes32):
    assert self.games[gameId].isActive, "Game is not active"
    assert self.games[gameId].hasStarted, "Game has not started"
    assert not self.games[gameId].hasEnded, "Game has ended"
    assert self.playerInfo[gameId][msg.sender].hasJoined, "Player has not joined"
    
    # Get current question index and question
    currentQuestionIdx: uint256 = self.games[gameId].currentQuestionIndex
    assert currentQuestionIdx < self.games[gameId].questionCount, "No more questions"
    
    # Check if answer is correct by comparing hashes
    if self.gameQuestions[gameId][currentQuestionIdx].answerHash == answer:
        self.playerInfo[gameId][msg.sender].score += 1
    
    self.playerInfo[gameId][msg.sender].lastAnswered = block.timestamp
    
    # Move to next question if all players have answered or timeout (simplified)
    allPlayersAnswered: bool = True
    
    # Use a fixed range loop with bounds check inside
    for i in range(MAX_PLAYERS):  # Loop through potential players
        if i >= self.games[gameId].currentPlayers:
            break
        
        player: address = self.playersInGame[gameId][i]
        if self.playerInfo[gameId][player].lastAnswered < block.timestamp - 120:  # 2 minute timeout
            allPlayersAnswered = False
            break
    
    if allPlayersAnswered:
        self.games[gameId].currentQuestionIndex += 1
        
        # If all questions answered, end the game
        if self.games[gameId].currentQuestionIndex >= self.games[gameId].questionCount:
            self._endGame(gameId)
    
    log AnswerSubmitted(gameId, msg.sender, currentQuestionIdx)

# Force next question (only game creator)
@external
def forceNextQuestion(gameId: uint256):
    assert self.games[gameId].creator == msg.sender, "Only game creator can force next question"
    assert self.games[gameId].isActive, "Game is not active"
    assert self.games[gameId].hasStarted, "Game has not started"
    assert not self.games[gameId].hasEnded, "Game has ended"
    
    self.games[gameId].currentQuestionIndex += 1
    
    # If all questions answered, end the game
    if self.games[gameId].currentQuestionIndex >= self.games[gameId].questionCount:
        self._endGame(gameId)

# End the game and determine winner (internal function)
@internal
def _endGame(gameId: uint256):
    highestScore: uint256 = 0
    winner: address = ZERO_ADDRESS
    
    # Find the player with highest score
    for i in range(MAX_PLAYERS):  # Loop through potential players
        if i >= self.games[gameId].currentPlayers:
            break
            
        player: address = self.playersInGame[gameId][i]
        playerScore: uint256 = self.playerInfo[gameId][player].score
        
        if playerScore > highestScore:
            highestScore = playerScore
            winner = player
    
    self.games[gameId].hasEnded = True
    self.games[gameId].winner = winner
    
    # Transfer prize to winner if there is one
    if winner != ZERO_ADDRESS:
        send(winner, self.games[gameId].totalPrize)
    
    log GameEnded(gameId, winner, self.games[gameId].totalPrize)

# End the game (only game creator)
@external
def endGame(gameId: uint256):
    assert self.games[gameId].creator == msg.sender, "Only game creator can end game"
    assert self.games[gameId].isActive, "Game is not active"
    assert self.games[gameId].hasStarted, "Game has not started"
    assert not self.games[gameId].hasEnded, "Game has already ended"
    
    self._endGame(gameId)

# View functions to get game info
@view
@external
def getGameInfo(gameId: uint256) -> (address, uint256, uint256, uint256, bool, bool, bool, uint256, address, uint256):
    # Note: entryFee and totalPrize are returned in Wei for accuracy
    # The frontend should convert from Wei to ETH for display
    return (
        self.games[gameId].creator,
        self.games[gameId].entryFee,
        self.games[gameId].maxPlayers,
        self.games[gameId].currentPlayers,
        self.games[gameId].isActive,
        self.games[gameId].hasStarted,
        self.games[gameId].hasEnded,
        self.games[gameId].totalPrize,
        self.games[gameId].winner,
        self.games[gameId].currentQuestionIndex
    )

@view
@external
def getPlayerScore(gameId: uint256, player: address) -> uint256:
    return self.playerInfo[gameId][player].score

@view
@external
def getCurrentQuestion(gameId: uint256) -> (uint8, bytes32):
    currentQuestionIdx: uint256 = self.games[gameId].currentQuestionIndex
    assert currentQuestionIdx < self.games[gameId].questionCount, "No more questions"
    
    question: Question = self.gameQuestions[gameId][currentQuestionIdx]
    return (question.category, question.questionHash)

# Get current question category
@view
@external
def getCurrentQuestionCategory(gameId: uint256) -> uint8:
    currentQuestionIdx: uint256 = self.games[gameId].currentQuestionIndex
    assert currentQuestionIdx < self.games[gameId].questionCount, "No more questions"
    
    return self.gameQuestions[gameId][currentQuestionIdx].category

# Emergency function to withdraw funds (only owner)
@external
def emergencyWithdraw():
    assert msg.sender == self.owner, "Only owner can withdraw"
    send(self.owner, self.balance)
