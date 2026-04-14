const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = {
  'teal': 'burgundy',
  'purple': 'copper',
  'paper': 'cream',
  'slate': 'sand',
  'gold': 'rosegold'
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(directoryPath);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  // Replace colors in Tailwind classes and css
  // Regex looks for the color name preceded by "from-", "via-", "to-", "bg-", "text-", "border-", "hover:bg-", "var(--color-", etc...
  // Or just simply match words since these are fairly unique, but let's be safe.
  
  Object.keys(replacements).forEach(oldColor => {
    const newColor = replacements[oldColor];
    // This regex matches tailwind prefixes and color variables
    const regex = new RegExp(`(bg|text|border|from|via|to|ring|shadow|fill|stroke|color)-${oldColor}\\b`, 'g');
    newContent = newContent.replace(regex, `$1-${newColor}`);
  });
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log("Done");
