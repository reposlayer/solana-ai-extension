import { pipeline } from '@xenova/transformers';
import { openDB } from 'idb';

let model = null;
const MODEL_CACHE_NAME = 'SolanaAIExplorerModelCache';
const MODEL_CACHE_KEY = 'bertModel';

async function getModelCache() {
  return openDB(MODEL_CACHE_NAME, 1, {
    upgrade(db) {
      db.createObjectStore('models');
    },
  });
}

export async function initModel() {
  if (!model) {
    const cache = await getModelCache();
    const cachedModel = await cache.get('models', MODEL_CACHE_KEY);
    
    if (cachedModel) {
      model = await pipeline('text-classification', cachedModel);
    } else {
      model = await pipeline('text-classification', 'Xenova/bert-base-uncased');
      await cache.put('models', await model.serialize(), MODEL_CACHE_KEY);
    }
  }
  return model;
}

export async function generateInsights(data) {
  if (!model) {
    throw new Error('Model not initialized');
  }

  let prompt = '';
  if (data.type === 'account') {
    prompt = `Analyze this Solana account: Address ${data.address}, Balance ${data.balance} SOL, Owner ${data.owner}, Data size ${data.dataSize} bytes, Executable: ${data.executable}`;
  } else if (data.type === 'transaction') {
    prompt = `Analyze this Solana transaction: Signature ${data.signature}, Status ${data.status}, Instructions: ${JSON.stringify(data.instructions)}`;
  }

  const result = await model(prompt, {
    max_length: 100,
    truncation: true,
  });

  return interpretResult(result[0], data);
}

function interpretResult(result, data) {
  const label = result.label;
  const score = result.score;

  let interpretation = '';
  if (data.type === 'account') {
    if (label === 'LABEL_0') {
      interpretation = `This appears to be a standard Solana account with a balance of ${data.balance} SOL. `;
    } else if (label === 'LABEL_1') {
      interpretation = `This account might be associated with a program or smart contract. `;
    }
    interpretation += `The account is ${data.executable ? '' : 'not '}executable. `;
  } else if (data.type === 'transaction') {
    if (label === 'LABEL_0') {
      interpretation = `This transaction appears to be a standard transfer. `;
    } else if (label === 'LABEL_1') {
      interpretation = `This transaction involves program interaction, possibly a smart contract call. `;
    }
    interpretation += `The transaction status is ${data.status}. `;
  }

  interpretation += `Confidence: ${(score * 100).toFixed(2)}%`;

  return interpretation;
}