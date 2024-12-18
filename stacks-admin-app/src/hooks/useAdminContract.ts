import { useCallback } from 'react';
import { openContractCall, ContractCallOptions } from '@stacks/connect';
import { 
  contractPrincipalCV,
  uintCV,
  stringAsciiCV,
  PostConditionMode
} from '@stacks/transactions';
import { NETWORK } from '../config/stacksConfig';
import { CONTRACT_ADDRESS, CONTRACT_NAME } from '../config/constants';
import { useStacksAuth } from '../context/StackAuthContext';

export function useAdminContract() {
   const  { userSession } = useStacksAuth();

  const proposeAdmin = useCallback(async (newAdmin: string) => {
    const functionArgs = [
      contractPrincipalCV(newAdmin, CONTRACT_NAME)
    ];

    const options: ContractCallOptions = {
      network,
      anchorMode: 1,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'propose-admin',
      functionArgs,
      postConditionMode: PostConditionMode.Deny,
      onFinish: data => {
        console.log('Transaction:', data);
      },
    };

    await openContractCall(options);
  }, []);

  const acceptAdmin = useCallback(async () => {
    const options: ContractCallOptions = {
      network,
      anchorMode: 1,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'accept-admin',
      functionArgs: [],
      postConditionMode: PostConditionMode.Deny,
      onFinish: data => {
        console.log('Transaction:', data);
      },
    };

    await openContractCall(options);
  }, []);

  const proposeAdminAction = useCallback(async (
    actionType: string,
    target: string
  ) => {
    const functionArgs = [
      stringAsciiCV(actionType),
      contractPrincipalCV(target, CONTRACT_NAME)
    ];

    const options: ContractCallOptions = {
      network,
      anchorMode: 1,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'propose-admin-action',
      functionArgs,
      postConditionMode: PostConditionMode.Deny,
      onFinish: data => {
        console.log('Transaction:', data);
      },
    };

    await openContractCall(options);
  }, []);

  const executeAdminAction = useCallback(async (actionId: number) => {
    const functionArgs = [uintCV(actionId)];

    const options: ContractCallOptions = {
      network,
      anchorMode: 1,
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: 'execute-admin-action',
      functionArgs,
      postConditionMode: PostConditionMode.Deny,
      onFinish: data => {
        console.log('Transaction:', data);
      },
    };

    await openContractCall(options);
  }, []);

  return {
    proposeAdmin,
    acceptAdmin,
    proposeAdminAction,
    executeAdminAction
  };
}