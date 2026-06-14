const fs = require('fs');
const path = require('path');
const files = [
	path.join(__dirname, '../DH2/config/official-formats.ts'),
	path.join(__dirname, 'caches/DH2/config/official-formats.ts')
];

for (const file of files) {
	let content = fs.readFileSync(file, 'utf8');
	content = content.replace(/\{[^}]*name: "\[Gen 3\] Orre Colosseum"[^}]*\},/g, '');
	fs.writeFileSync(file, content);
	console.log('Fixed', file);
}
