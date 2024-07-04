import * as solanaWeb3 from '@solana/web3.js';
import { rateLimit } from '../utils/rateLimiter';

const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));

export async function analyzeAccount(address) {
  await rateLimit();
  const pubkey = new solanaWeb3.PublicKey(address);
  const accountInfo = await connection.getAccountInfo(pubkey);
  const balance = await connection.getBalance(pubkey);

  return {
    type: 'account',
    address: address,
    balance: balance / solanaWeb3.LAMPORTS_PER_SOL,
    owner: accountInfo.owner.toBase58(),
    dataSize: accountInfo.data.length,
    executable: accountInfo.executable
  };
}

export async function analyzeTransaction(signature) {
  await rateLimit();
  const tx = await connection.getParsedTransaction(signature, 'confirmed');

  return {
    type: 'transaction',
    signature: signature,
    status: tx.meta.err ? 'failed' : 'success',
    instructions: tx.transaction.message.instructions.map(ix => ({
      programId: ix.programId.toString(),
      data: ix.data,
      accounts: ix.accounts.map(acc => acc.toString())
    }))
  };
}
