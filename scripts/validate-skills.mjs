import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');
const skillsRoot = path.join(workspaceRoot, 'skills');
const reportPath = path.join(workspaceRoot, 'docs', 'SKILLS_VALIDATION.md');

const requiredSkillSlugs = [
  'rebrand',
  'policy-guide',
  'hidden-admin-auth',
  'add-redirect',
  'playwright-migration',
  'migrate-api-to-tanstack-query',
  'migrate-api-to-graphql-client',
  'react-hooks',
  'migrate-design-system-to-shadcn',
];

const requiredHeadings = [
  '## Goal',
  '## Files To Update',
  '## Validation Checklist',
  '## Done Criteria',
];

const rootFileAllowlist = new Set([
  '.envTemplate',
  'AGENTS.md',
  'README.md',
  'cypress.config.ts',
  'index.html',
  'package.json',
  'playwright.config.ts',
]);

const optionalMissingPaths = new Set([
  'playwright.config.ts',
]);

const parseFrontmatter = (content) => {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    return {};
  }

  const fields = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator < 0) {
      continue;
    }
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    fields[key] = value;
  }
  return fields;
};

const extractPathReferences = (content) => {
  const references = [];
  const pattern = /`([^`\n]+\.[a-z0-9]+)`/gi;

  for (const match of content.matchAll(pattern)) {
    const value = match[1];
    if (!value || value.includes('<') || value.startsWith('http')) {
      continue;
    }
    if (value.includes('*') || value.includes(' ')) {
      continue;
    }
    if (value.startsWith('npm') || value.startsWith('rg')) {
      continue;
    }
    if (value.includes('"') || value.includes("'")) {
      continue;
    }
    const looksLikePath = value.includes('/') || rootFileAllowlist.has(value);
    if (!looksLikePath) {
      continue;
    }
    references.push({
      value,
      index: match.index ?? -1,
    });
  }

  return references;
};

const results = [];
let hasFailure = false;

for (const slug of requiredSkillSlugs) {
  const relativePath = `skills/${slug}/SKILL.md`;
  const absolutePath = path.join(workspaceRoot, relativePath);
  const result = {
    slug,
    path: relativePath,
    exists: fs.existsSync(absolutePath),
    frontmatter: false,
    headings: true,
    references: true,
    notes: [],
  };

  if (!result.exists) {
    result.notes.push('Missing required skill file.');
    hasFailure = true;
    results.push(result);
    continue;
  }

  const content = fs.readFileSync(absolutePath, 'utf8');
  const frontmatter = parseFrontmatter(content);
  result.frontmatter = Boolean(frontmatter.name) && Boolean(frontmatter.description);
  if (!result.frontmatter) {
    result.notes.push('Missing frontmatter `name` or `description`.');
    hasFailure = true;
  }

  for (const heading of requiredHeadings) {
    if (!content.includes(heading)) {
      result.headings = false;
      result.notes.push(`Missing heading: ${heading}`);
      hasFailure = true;
    }
  }

  const referencedPaths = extractPathReferences(content);
  const missingRefs = referencedPaths
    .filter((reference) => {
      const referencePath = reference.value;
      if (optionalMissingPaths.has(referencePath)) {
        return false;
      }
      const exists = fs.existsSync(path.join(workspaceRoot, referencePath));
      if (exists) {
        return false;
      }

      const start = Math.max(0, reference.index - 80);
      const end = Math.min(content.length, reference.index + 80);
      const context = content.slice(start, end).toLowerCase();
      const isExamplePath = context.includes('for example');
      const isPlannedAdd = context.includes('add') && !context.includes('remove');

      return !isExamplePath && !isPlannedAdd;
    })
    .map((reference) => reference.value);

  if (missingRefs.length > 0) {
    result.references = false;
    result.notes.push(`Missing file references: ${missingRefs.join(', ')}`);
    hasFailure = true;
  }

  results.push(result);
}

const timestamp = new Date().toISOString();
const summaryRows = results.map((result) => {
  const status = result.exists && result.frontmatter && result.headings && result.references
    ? 'PASS'
    : 'FAIL';
  const notes = result.notes.length > 0 ? result.notes.join(' ') : 'OK';
  return `| ${result.slug} | ${status} | ${notes} |`;
}).join('\n');

const report = `# Skills Validation Report

Generated: ${timestamp}

Scope: required skills from issue #144.

| Skill | Status | Notes |
|---|---|---|
${summaryRows}
`;

fs.writeFileSync(reportPath, report, 'utf8');

if (hasFailure) {
  console.error('Skill validation failed. See docs/SKILLS_VALIDATION.md');
  process.exit(1);
}

console.log(`Skill validation passed for ${results.length} required skills.`);
