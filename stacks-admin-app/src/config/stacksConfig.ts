import { AppConfig } from '@stacks/connect';
import { STACKS_TESTNET, STACKS_MAINNET } from '@stacks/network';

// Update these based on your deployment environment
export const IS_MAINNET = false;
export const NETWORK = IS_MAINNET ? STACKS_MAINNET : STACKS_TESTNET;

// Configure the app
export const appConfig = new AppConfig(['store_write']);