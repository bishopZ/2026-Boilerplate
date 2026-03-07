import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');
const clientRoot = path.join(workspaceRoot, 'src', 'client');
const localesRoot = path.join(clientRoot, 'locales');

const localeFiles = ['en.json', 'ar.json', 'fr.json'];

const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const collectSourceFiles = (root) => {
  const output = [];
  const walk = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
        output.push(fullPath);
      }
    }
  };

  walk(root);
  return output;
};

const extractIdsFromSource = (source) => {
  const ids = new Set();
  const patterns = [
    /<FormattedMessage\s+id="([^"]+)"/g,
    /<FormattedMessage\s+id=\{'([^']+)'\}/g,
    /formatMessage\(\{\s*id:\s*'([^']+)'\s*\}\)/g,
    /labelId:\s*'([^']+)'/g,
  ];

  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      const id = match[1];
      if (id) {
        ids.add(id);
      }
    }
  }

  return ids;
};

const localeMaps = localeFiles.map((filename) => ({
  filename,
  entries: readJson(path.join(localesRoot, filename)),
}));

const baseKeys = new Set(Object.keys(localeMaps[0].entries));

for (const { filename, entries } of localeMaps.slice(1)) {
  const keys = new Set(Object.keys(entries));
  const missingFromLocale = [...baseKeys].filter((key) => !keys.has(key));
  const extraInLocale = [...keys].filter((key) => !baseKeys.has(key));

  if (missingFromLocale.length > 0 || extraInLocale.length > 0) {
    console.error(`Locale key mismatch detected in ${filename}.`);
    if (missingFromLocale.length > 0) {
      console.error(`  Missing keys: ${missingFromLocale.join(', ')}`);
    }
    if (extraInLocale.length > 0) {
      console.error(`  Extra keys: ${extraInLocale.join(', ')}`);
    }
    process.exit(1);
  }
}

const usedIds = new Set();
for (const sourceFile of collectSourceFiles(clientRoot)) {
  const source = fs.readFileSync(sourceFile, 'utf8');
  const ids = extractIdsFromSource(source);
  for (const id of ids) {
    usedIds.add(id);
  }
}

for (const { filename, entries } of localeMaps) {
  const keys = new Set(Object.keys(entries));
  const missingUsedIds = [...usedIds].filter((id) => !keys.has(id));
  if (missingUsedIds.length > 0) {
    console.error(`${filename} is missing used message ids: ${missingUsedIds.join(', ')}`);
    process.exit(1);
  }
}

console.log(`i18n key check passed for ${localeFiles.length} locales and ${usedIds.size} used message ids.`);
