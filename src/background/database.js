import { openDB } from 'idb';

const DB_NAME = 'SolanaAIExplorerDB';
const KNOWN_SCAMS_STORE = 'knownScams';
const REPORTS_STORE = 'reports';

async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(KNOWN_SCAMS_STORE, { keyPath: 'address' });
      db.createObjectStore(REPORTS_STORE, { keyPath: 'id', autoIncrement: true });
    },
  });
}

export async function checkKnownScam(address) {
  const db = await getDB();
  return db.get(KNOWN_SCAMS_STORE, address);
}

export async function reportScam(data) {
  const db = await getDB();
  return db.add(REPORTS_STORE, {
    ...data,
    timestamp: new Date().toISOString()
  });
}

export async function getScamReports(address) {
  const db = await getDB();
  return db.getAllFromIndex(REPORTS_STORE, 'address', address);
}