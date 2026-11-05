const fs = require('fs');
const path = require('path');

// Unicode Emoji regex
const emojiRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2300}-\u{23FF}\u{2B50}\u{200D}\u{FE0F}]/u;

// Forbidden colors regex (purple, violet, indigo)
const colorRegex = /\b(purple|violet|indigo)\b/i;

function walk(dir) {
  let files = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git' && f !== '.agents') {
        files = files.concat(walk(full));
      }
    } else if (/\.(tsx|ts|js|jsx|css)$/.test(f)) {
      files.push(full);
    }
  }
  return files;
}

const srcFiles = walk(path.resolve(__dirname, '../../../src'));
console.log(`Scanning ${srcFiles.length} files in src/...`);

let emojiMatches = [];
let colorMatches = [];

for (const file of srcFiles) {
  const rel = path.relative(path.resolve(__dirname, '../../../'), file);
  const lines = fs.readFileSync(file, 'utf-8').split('\n');
  lines.forEach((line, index) => {
    if (emojiRegex.test(line)) {
      emojiMatches.push({ file: rel, line: index + 1, text: line.trim() });
    }
    if (colorRegex.test(line)) {
      colorMatches.push({ file: rel, line: index + 1, text: line.trim() });
    }
  });
}

console.log('--- EMOJI SCAN RESULTS ---');
console.log(`Total emoji matches: ${emojiMatches.length}`);
emojiMatches.forEach(m => console.log(`${m.file}:${m.line} -> ${m.text}`));

console.log('\n--- FORBIDDEN COLOR SCAN RESULTS ---');
console.log(`Total forbidden color matches: ${colorMatches.length}`);
colorMatches.forEach(m => console.log(`${m.file}:${m.line} -> ${m.text}`));
