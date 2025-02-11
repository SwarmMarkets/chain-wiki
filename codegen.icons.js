const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

function getArgValue(argName) {
  const index = args.indexOf(argName);
  return index !== -1 && args[index + 1] ? args[index + 1] : null;
}

const outputDirectory = getArgValue('--outputDirectory') || 'src/types/icons';
console.log(`Output Directory: ${outputDirectory}`);

const assetsDirectory = path.join(__dirname, 'public/assets/icons');

function readIconFileNames(directory) {
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith('.svg'))
    .map((file) => file.replace('.svg', ''));
}

function generateIconType(iconFileNames) {
  return `
// AUTO-GENERATED FILE - DO NOT MODIFY DIRECTLY

export type IconName = ${iconFileNames.map((name) => `'${name}'`).join(' | ')};
`;
}

function writeIconTypeToFile() {
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  const iconFileNames = readIconFileNames(assetsDirectory);

  const iconTypeContent = generateIconType(iconFileNames);

  const outputPath = path.join(outputDirectory, 'iconNames.ts');
  fs.writeFileSync(outputPath, iconTypeContent);

  console.log(`Icon names have been generated and saved to: ${outputPath}`);
}

// Run the script
writeIconTypeToFile();
