// Incremental, reversible relocation: retain a compatibility export at the old path.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../src/data');
const relative = process.argv[2];
if (!relative || !relative.endsWith('.ts') || relative.includes('..') || relative.startsWith('offline')) throw Error('Expected a data TypeScript module');
const source = path.resolve(root, relative);
const target = path.resolve(root, 'offline', relative);
if (!source.startsWith(root + path.sep) || !target.startsWith(root + path.sep + 'offline' + path.sep)) throw Error('Outside data directory');
if (fs.existsSync(target)) throw Error('Destination already exists');
const original = fs.readFileSync(source, 'utf8');
const relocated = original.replace(/(['"])(\.{1,2}\/[^'"\r\n]+)\1/g, (_, quote, rel) => {
  const next = path.relative(path.dirname(target), path.resolve(path.dirname(source), rel)).split(path.sep).join('/');
  return quote + (next.startsWith('.') ? next : './' + next) + quote;
});
let link = path.relative(path.dirname(source), target).split(path.sep).join('/').replace(/\.ts$/, '');
if (!link.startsWith('.')) link = './' + link;
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, relocated, { flag: 'wx' });
fs.writeFileSync(source, `/** Compatibility export; maintain emergency content in data/offline. */\nexport * from '${link}';\n`);
console.log(relative);
