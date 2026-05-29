const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

const replacements = [
  // Class replacements
  { regex: /\.solar-panel-card-indigo\b/g, replace: '.solar-panel-card-sky' },
  { regex: /\bsolar-panel-card-indigo\b/g, replace: 'solar-panel-card-sky' },
  { regex: /\bpurple-([3-8]00)\b/g, replace: 'sky-$1' },
  { regex: /\bindigo-([3-8]00)\b/g, replace: 'blue-$1' },
  
  // Specific tailwind colors with opacity / background
  { regex: /bg-purple-500\/10/g, replace: 'bg-sky-500/10' },
  { regex: /bg-purple-500\/20/g, replace: 'bg-sky-500/20' },
  { regex: /bg-purple-500\/\[0\.02\]/g, replace: 'bg-sky-500/[0.015]' },
  { regex: /bg-purple-500\/\[0\.015\]/g, replace: 'bg-sky-500/[0.015]' },
  { regex: /bg-purple-500\/\[0\.03\]/g, replace: 'bg-sky-500/[0.015]' },
  { regex: /bg-purple-500\/\[0\.06\]/g, replace: 'bg-sky-500/[0.06]' },
  { regex: /bg-purple-500\/\[0\.04\]/g, replace: 'bg-sky-500/[0.04]' },
  { regex: /border-purple-500\/10/g, replace: 'border-sky-500/10' },
  { regex: /border-purple-500\/20/g, replace: 'border-sky-500/20' },
  { regex: /border-purple-500\/30/g, replace: 'border-sky-500/30' },
  { regex: /border-purple-500\/40/g, replace: 'border-sky-500/40' },
  { regex: /border-purple-400\/15/g, replace: 'border-sky-400/15' },
  { regex: /text-purple-400\/80/g, replace: 'text-sky-400/80' },
  { regex: /bg-purple-400\/10/g, replace: 'bg-sky-400/10' },
  { regex: /via-purple-500\/10/g, replace: 'via-sky-500/10' },
  { regex: /via-purple-500\/20/g, replace: 'via-sky-500/20' },
  { regex: /via-purple-500\/30/g, replace: 'via-sky-500/30' },
  { regex: /from-purple-500\/20/g, replace: 'from-sky-500/20' },
  { regex: /to-purple-600\/10/g, replace: 'to-blue-600/10' },
  { regex: /shadow-\[0_0_15px_rgba\(139,92,246,0\.2\)\]/g, replace: 'shadow-[0_0_15px_rgba(14,165,233,0.15)]' },
  { regex: /shadow-\[0_0_15px_rgba\(139,92,246,0\.1\)\]/g, replace: 'shadow-[0_0_15px_rgba(14,165,233,0.1)]' },
  { regex: /group-hover:shadow-\[0_0_20px_rgba\(139,92,246,0\.15\)\]/g, replace: 'group-hover:shadow-[0_0_20px_rgba(14,165,233,0.15)]' },
  { regex: /group-hover:shadow-\[0_0_40px_-10px_rgba\(139,92,246,0\.18\)\]/g, replace: 'group-hover:shadow-[0_0_40px_-10px_rgba(14,165,233,0.18)]' },
  { regex: /rgba\(139,\s*92,\s*246,\s*0\.04\)/g, replace: 'rgba(14, 165, 233, 0.04)' },
  { regex: /rgba\(139,\s*92,\s*246,\s*0\.12\)/g, replace: 'rgba(14, 165, 233, 0.12)' },
  { regex: /rgba\(139,\s*92,\s*246,\s*0\.3\)/g, replace: 'rgba(14, 165, 233, 0.3)' },
  { regex: /rgba\(139,\s*92,\s*246,\s*0\.35\)/g, replace: 'rgba(14, 165, 233, 0.35)' },
  { regex: /rgba\(139,\s*92,\s*246,\s*0\.7\)/g, replace: 'rgba(14, 165, 233, 0.7)' },
  { regex: /rgba\(139,\s*92,\s*246,\s*0\.15\)/g, replace: 'rgba(14, 165, 233, 0.15)' },
  
  // Model/Offerings properties
  { regex: /accent:\s*'purple'/g, replace: "accent: 'sky'" },
  { regex: /accentMap\.purple/g, replace: 'accentMap.sky' },
  { regex: /off\.accent\s*===\s*'purple'\s*\?\s*'solar-panel-card-indigo'/g, replace: "off.accent === 'sky' ? 'solar-panel-card-sky'" },
  { regex: /model\.accent\s*===\s*'purple'\s*\?\s*'solar-panel-card-indigo'/g, replace: "model.accent === 'sky' ? 'solar-panel-card-sky'" },
  { regex: /opt\.accent\s*===\s*'purple'\s*\?\s*'solar-panel-card-indigo'/g, replace: "opt.accent === 'sky' ? 'solar-panel-card-sky'" },
];

console.log('Starting purple removal...');

walkDir(srcDir, (filePath) => {
  const ext = path.extname(filePath);
  if (ext !== '.tsx' && ext !== '.ts' && ext !== '.css' && ext !== '.js') return;
  
  // Skip scratch dir in src if any
  if (filePath.includes('scratch')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Perform updates
  replacements.forEach(r => {
    content = content.replace(r.regex, r.replace);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${path.relative(srcDir, filePath)}`);
  }
});

console.log('Purple removal script finished.');
