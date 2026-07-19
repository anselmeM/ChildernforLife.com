const fs = require('fs');

const content = fs.readFileSync('c:/Users/amotc/Documents/GitHub/repos/ChildernforLife.com/src/App.jsx', 'utf8');

const navStartIdx = content.indexOf('const Navigation = () =>');
const navEndIdx = content.indexOf('const HomeScreen = () =>');

if (navStartIdx === -1 || navEndIdx === -1) {
  console.log("Could not find Navigation or HomeScreen");
  process.exit(1);
}

const navBlock = content.substring(navStartIdx, navEndIdx);

let stack = [];
let cleanBlock = navBlock.replace(/\{\s*\/\*.*?\*\/\s*\}/gs, '').replace(/\/\/.*/g, '');

const regex = /<\s*(\/?)\s*([a-zA-Z0-9:-]+)(?:\s+[^>]*?)?(\/?)\s*>/gs;
let match;

while ((match = regex.exec(cleanBlock)) !== null) {
  const isClose = match[1] === '/';
  const name = match[2];
  const isSelfClose = match[3] === '/';
  
  const beforeMatch = cleanBlock.substring(0, match.index);
  const lineNum = beforeMatch.split('\n').length + 77;
  
  if (isSelfClose || ['path', 'circle', 'line', 'img', 'br', 'hr', 'input'].includes(name.toLowerCase())) {
    continue;
  }
  
  console.log(`L${lineNum}: ${isClose ? '</' : '<'}${name}>`);
  
  if (isClose) {
    if (stack.length > 0 && stack[stack.length - 1].name === name) {
      stack.pop();
    } else {
      console.log(`  !! Mismatch !! expected </${stack.length > 0 ? stack[stack.length - 1].name : 'none'}>`);
      stack.push({ name, line: lineNum, type: 'mismatch-close' });
    }
  } else {
    stack.push({ name, line: lineNum });
  }
}
