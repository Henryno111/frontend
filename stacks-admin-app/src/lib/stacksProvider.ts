import { AppConfig, UserSession } from '@stacks/connect';
// import { StacksNetwork, StacksTestnet } from '@stacks/network';
import { StacksTestnet } from '@stacks/network';
// Configure your deployed contract's details
export const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS';
export const CONTRACT_NAME = 'YOUR_CONTRACT_NAME';

// Initialize Stacks network (testnet for development)
export const network = new StacksTestnet();

// Configure the app
const appConfig = new AppConfig(['store_write']);

// Initialize user session
export const userSession = new UserSession({ appConfig });

// Helper to check if user is signed in
export const isSignedIn = () => userSession.isUserSignedIn();

// Helper to get user data
export const getUserData = () => userSession.loadUserData();