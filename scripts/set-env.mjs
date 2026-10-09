import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env.example',
});

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

if (!apiUrl || !apiKey) {
  throw new Error('Missing API_URL or API_KEY in .env.example');
}

const assetsPath = path.resolve('src/assets');

fs.mkdirSync(assetsPath, { recursive: true });

const config = {
  apiUrl,
  apiKey,
};

fs.writeFileSync(path.join(assetsPath, 'config.json'), JSON.stringify(config, null, 2));

console.log(' config.json generated');
