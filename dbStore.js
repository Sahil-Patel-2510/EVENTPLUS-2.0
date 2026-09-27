const fs = require('fs/promises');
const path = require('path');

const DB_DIR = path.join(__dirname, 'db');
const USERS_FILE = path.join(DB_DIR, 'eventplus.users.json');
const ENQUIRIES_FILE = path.join(DB_DIR, 'eventplus.enquiries.json');

async function ensureDataFiles() {
  await fs.mkdir(DB_DIR, { recursive: true });

  for (const filePath of [USERS_FILE, ENQUIRIES_FILE]) {
    try {
      await fs.access(filePath);
    } catch {
      await fs.writeFile(filePath, '[]', 'utf8');
    }
  }
}

async function readJson(filePath, fallback = []) {
  try {
    const contents = await fs.readFile(filePath, 'utf8');
    if (!contents.trim()) {
      return fallback;
    }

    const parsed = JSON.parse(contents);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

async function writeJson(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  return data;
}

async function findUserByEmail(email) {
  const users = await readJson(USERS_FILE, []);
  const targetEmail = String(email || '').trim().toLowerCase();

  return users.find((user) => String(user.email || '').trim().toLowerCase() === targetEmail) || null;
}

async function addUser(userData) {
  const users = await readJson(USERS_FILE, []);
  const email = String(userData.email || '').trim().toLowerCase();

  const existingUser = users.find((user) => String(user.email || '').trim().toLowerCase() === email);
  if (existingUser) {
    return existingUser;
  }

  const newUser = {
    ...userData,
    email,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  await writeJson(USERS_FILE, users);
  return newUser;
}

async function addEnquiry(enquiryData) {
  const enquiries = await readJson(ENQUIRIES_FILE, []);
  const newEnquiry = {
    ...enquiryData,
    createdAt: new Date().toISOString()
  };

  enquiries.push(newEnquiry);
  await writeJson(ENQUIRIES_FILE, enquiries);
  return newEnquiry;
}

module.exports = {
  DB_DIR,
  USERS_FILE,
  ENQUIRIES_FILE,
  ensureDataFiles,
  readJson,
  writeJson,
  findUserByEmail,
  addUser,
  addEnquiry
};
