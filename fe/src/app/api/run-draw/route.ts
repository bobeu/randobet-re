/*eslint-disable */
import { NextRequest, NextResponse } from 'next/server';
import { createWalletClient, http, createPublicClient } from 'viem';
import { celo, celoSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { Address } from '@/types';
import { filterTransactionData } from '@/components/utilities/common';

export async function POST(request: NextRequest) {
  try {
    const { randoPults, trigger, chainId } = await request.json();
    const chain = chainId === celoSepolia.id? celoSepolia : celo;
    // Get the private key from environment variables
    const privateKey = process.env.RUNNER_0xC0F;
    if (!privateKey) {
      return NextResponse.json({ error: 'Private key not configured' }, { status: 500 });
    }

    // Create account from private key
    const account = privateKeyToAccount(privateKey as Address);
    const { contractAddresses: ca, transactionData: td} = filterTransactionData({chainId, filter:true, functionNames: ['runDraw']});
    
    // Create wallet client
    const walletClient = createWalletClient({
      account,
      chain,
      transport: http(),
    });

    // Create public client
    const publicClient = createPublicClient({
      chain,
      transport: http(),
    });

    // Execute the runDraw transaction
    const hash = await walletClient.writeContract({
      address: ca.RandoFutures as Address,
      abi: td[0].abi,
      functionName: td[0].functionName,
      args: [randoPults, trigger]
    });

    // Wait for transaction receipt
    const receipt = await publicClient.waitForTransactionReceipt({ hash, confirmations: 2 });

    return NextResponse.json({ 
      success: true, 
      transactionHash: receipt.transactionHash,
      status: receipt.status
    });

  } catch (error) {
    console.error('Error running draw:', error);
    return NextResponse.json({ 
      error: 'Failed to run draw',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
