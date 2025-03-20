// Deployed contract address on Sepolia testnet
const CONTRACT_ADDRESS = "0xa7B5E39CA6C545C3151118719910ee6881FFAA56";

// Contract ABI - this is the interface that tells the frontend how to interact with your contract
const CONTRACT_ABI = [
    // (Keep the existing ABI from your previous contract.js file)
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
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Create provider and signer
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            
            // Create contract instance
            contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            
            // Check network
            const network = await provider.getNetwork();
            const networkInfo = document.getElementById('network-info');
            
            if (network.chainId !== 11155111) { // Sepolia chainId
                networkInfo.classList.remove('d-none');
                networkInfo.classList.add('alert-warning');
                networkInfo.innerHTML = `
                    Connected to ${network.name}. 
                    Please switch to Sepolia testnet in MetaMask.
                `;
                return false;
            }
            
            networkInfo.classList.remove('d-none');
            networkInfo.innerHTML = `Connected to Sepolia Testnet`;
            
            return true;
        } catch (error) {
            console.error("Ethereum connection error:", error);
            
            // Improved error display
            const statusArea = document.getElementById('status-area');
            const statusMessage = document.getElementById('status-message');
            
            statusArea.classList.remove('d-none');
            statusMessage.classList.remove('alert-info');
            statusMessage.classList.add('alert-danger');
            statusMessage.textContent = `Connection failed: ${error.message}`;
            
            return false;
        }
    } else {
        // No MetaMask detected
        const statusArea = document.getElementById('status-area');
        const statusMessage = document.getElementById('status-message');
        
        statusArea.classList.remove('d-none');
        statusMessage.classList.remove('alert-info');
        statusMessage.classList.add('alert-danger');
        statusMessage.innerHTML = `
            MetaMask is not installed. 
            <a href="https://metamask.io/download.html" target="_blank">
                Please install MetaMask to use this dApp
            </a>
        `;
        
        return false;
    }
}

// (Rest of the contract.js functions remain the same)

// Add a check for Web3 provider on page load
document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.ethereum === 'undefined') {
        const connectWalletBtn = document.getElementById('connect-wallet');
        connectWalletBtn.disabled = true;
        connectWalletBtn.textContent = 'MetaMask Not Detected';
    }
});