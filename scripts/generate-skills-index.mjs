import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, '..');
const skillsRoot = path.join(workspaceRoot, 'skills');

const SKILLS_START = '<!-- SKILLS_INDEX_START -->';
const SKILLS_END = '<!-- SKILLS_INDEX_END -->';

const parseFrontmatter = (content) => {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    return {};
  }

  const fields = {};
  const lines = match[1].split('\n');
  for (const line of lines) {
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

const collectSkills = () => {
  const entries = fs.readdirSync(skillsRoot, { withFileTypes: true });
  const skills = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const relativePath = `skills/${entry.name}/SKILL.md`;
    const absolutePath = path.join(workspaceRoot, relativePath);
    if (!fs.existsSync(absolutePath)) {
      continue;
    }

    const content = fs.readFileSync(absolutePath, 'utf8');
    const frontmatter = parseFrontmatter(content);
    const description = typeof frontmatter.description === 'string' && frontmatter.description.length > 0
      ? frontmatter.description
      : 'No description provided.';

    skills.push({
      path: relativePath,
      description,
    });
  }

  return skills.sort((a, b) => a.path.localeCompare(b.path));
};

const replaceBetweenMarkers = (content, replacement) => {
  const startIndex = content.indexOf(SKILLS_START);
  const endIndex = content.indexOf(SKILLS_END);

  if (startIndex < 0 || endIndex < 0 || endIndex <= startIndex) {
    throw new Error(`Missing or invalid skills markers (${SKILLS_START} / ${SKILLS_END}).`);
  }

  const before = content.slice(0, startIndex + SKILLS_START.length);
  const after = content.slice(endIndex);
  return `${before}\n${replacement}\n${after}`;
};

const skills = collectSkills();
const agentsLines = skills.map((skill) => `- \`${skill.path}\` — ${skill.description}`).join('\n');
const readmeLines = skills.map((skill) => `  - [${skill.path}](${skill.path}) — ${skill.description}`).join('\n');

const agentsPath = path.join(workspaceRoot, 'AGENTS.md');
const readmePath = path.join(workspaceRoot, 'README.md');

const agentsContent = fs.readFileSync(agentsPath, 'utf8');
const readmeContent = fs.readFileSync(readmePath, 'utf8');

fs.writeFileSync(agentsPath, replaceBetweenMarkers(agentsContent, agentsLines), 'utf8');
fs.writeFileSync(readmePath, replaceBetweenMarkers(readmeContent, readmeLines), 'utf8');

console.log(`Updated skills index in AGENTS.md and README.md with ${skills.length} skills.`);
