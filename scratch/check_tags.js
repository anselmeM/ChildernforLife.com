const fs = require('fs');

const content = fs.readFileSync('c:/Users/amotc/Documents/GitHub/repos/ChildernforLife.com/src/App.jsx', 'utf8');
const lines = content.split('\n');

// Analyze the Navigation component block (lines 78 to 255)
const navLines = lines.slice(77, 255);

let openTags = [];
const selfClosing = new Set(['path', 'circle', 'line', 'heart', 'img', 'br', 'hr', 'input', 'meta', 'link']);

navLines.forEach((line, idx) => {
  const lineNum = idx + 78;
  
  // Clean comments
  let cleanLine = line.replace(/\{\s*\/\*.*?\*\/\s*\}/g, '').replace(/\/\/.*/g, '');
  
  // Regex to find tags: <tagname ...> or </tagname>
  // We need to match <div, </div>, etc.
  const regex = /<\/?([a-zA-Z0-9:-]+)(?:\s+[^>]*?)?(\/?)>/g;
  let match;
  
  while ((match = regex.exec(cleanLine)) !== null) {
    const tagName = match[1];
    const isClosing = cleanLine.startsWith('</' + tagName, match.index) || match[2] === '/';
    
    if (selfClosing.has(tagName.toLowerCase())) {
      continue;
    }
    
    if (isClosing) {
      if (openTags.length > 0 && openTags[openTags.length - 1].name === tagName) {
        openTags.pop();
      } else {
        console.log(`Mismatch at line ${lineNum}: closing </${tagName}> but current open tags are: ${openTags.map(t => `${t.name} (L${t.line})`).join(', ')}`);
        openTags.push({ name: tagName, line: lineNum, type: 'close-mismatch' });
      }
    } else {
      openTags.push({ name: tagName, line: lineNum, type: 'open' });
    }
  }
});

console.log("Final unmatched tags:");
openTags.forEach(t => {
  console.log(`${t.name} opened at line ${t.line}`);
});
