// src/utils/contract.ts
import {
    ContractCall,
    createStacksPrivateKey,
    makeContractCall,
    broadcastTransaction,
    BufferCV,
    stringAsciiCV,
    uintCV,
  } from '@stacks/transactions';
  import { StacksTestnet } from '@stacks/network';
  
  import { CONTRACT_ADDRESS, CONTRACT_NAME } from './config';
  
  const network = new StacksTestnet();
  
  export const proposeAdmin = async (newAdmin: string) => {
    const txOptions = {
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'propose-admin',
      functionArgs: [stringAsciiCV(newAdmin)],
      network,
    };
  
    return makeContractCall(txOptions);
  };
  
  export const proposeAdminAction = async (actionType: string, target: string) => {
    const txOptions = {
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'propose-admin-action',
      functionArgs: [stringAsciiCV(actionType), stringAsciiCV(target)],
      network,
    };
  
    return makeContractCall(txOptions);
  };
  
  export const executeAdminAction = async (actionId: number) => {
    const txOptions = {
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'execute-admin-action',
      functionArgs: [uintCV(actionId)],
      network,
    };
  
    return makeContractCall(txOptions);
  };