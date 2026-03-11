import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');

const readFile = (relativePath) => {
  const fullPath = path.join(workspaceRoot, relativePath);
  return fs.readFileSync(fullPath, 'utf8');
};

const checks = [
  {
    type: 'forbid',
    file: 'docs/TECHNOLOGY.md',
    regex: /Future improvements will focus on implementing additional features like CSRF protection and login attempts limits/i,
    message: 'TECHNOLOGY.md still describes CSRF/rate-limits as future work.',
  },
  {
    type: 'require',
    file: 'docs/TECHNOLOGY.md',
    regex: /CSRF protection and login rate limiting are already enabled/i,
    message: 'TECHNOLOGY.md should explicitly reflect that CSRF/rate-limiting are already enabled.',
  },
  {
    type: 'require',
    file: 'docs/AUTHENTICATION.md',
    regex: /`POST \/api\/session`/i,
    message: 'AUTHENTICATION.md should include the REST login endpoint (`POST /api/session`).',
  },
  {
    type: 'require',
    file: 'docs/AUTHENTICATION.md',
    regex: /`POST \/login\/password`/i,
    message: 'AUTHENTICATION.md should include the legacy login endpoint (`POST /login/password`).',
  },
];

let hasFailure = false;

for (const check of checks) {
  const content = readFile(check.file);
  const matched = check.regex.test(content);

  if (check.type === 'require' && !matched) {
    console.error(`Docs consistency check failed: ${check.message}`);
    hasFailure = true;
  }

  if (check.type === 'forbid' && matched) {
    console.error(`Docs consistency check failed: ${check.message}`);
    hasFailure = true;
  }
}

if (hasFailure) {
  process.exit(1);
}

console.log(`Docs consistency check passed for ${checks.length} checks.`);
