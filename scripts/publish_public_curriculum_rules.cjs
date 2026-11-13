// Adds narrowly scoped public curriculum reads to deployed rules, preserving every other rule.
const fs = require('node:fs');
const { GoogleAuth } = require('google-auth-library');
async function main() {
  const auth = new GoogleAuth({ keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS, scopes: ['https://www.googleapis.com/auth/cloud-platform'] });
  const client = await auth.getClient();
  const base = 'https://firebaserules.googleapis.com/v1/';
  const releaseName = 'projects/jasne-7efe7/releases/cloud.firestore';
  const release = (await client.request({ url: base + releaseName })).data;
  const ruleset = (await client.request({ url: base + release.rulesetName })).data;
  const file = ruleset.source.files.find(file => file.name.endsWith('.rules'));
  if (!file) throw Error('Firestore rules file not found');
  let content = file.content;
  if (!content.includes('match /taskBanks/')) {
    const anchor = 'match /subjects/{subjectId} {';
    if (!content.includes(anchor)) throw Error('Expected subjects scope not found');
    content = content.replace(anchor, anchor + '\n      // Public curriculum banks; writes remain restricted to Admin SDK.\n      match /taskBanks/{bankId} {\n        allow read: if true;\n        allow write: if false;\n        match /chunks/{chunkId} {\n          allow read: if true;\n          allow write: if false;\n        }\n      }\n');
  }
  if (!content.includes('match /system/promotions')) {
    const anchor = 'match /system/meta {';
    if (!content.includes(anchor)) throw Error('Expected system scope not found');
    content = content.replace(anchor, 'match /system/promotions { allow read: if true; allow write: if false; }\n\n    ' + anchor);
  }
  fs.mkdirSync('artifacts/curriculum-backups', { recursive: true });
  fs.writeFileSync('artifacts/curriculum-backups/firestore.rules.before-public-banks', file.content);
  fs.writeFileSync('artifacts/curriculum-backups/firestore.rules.after-public-banks', content);
  console.log(JSON.stringify({ changed: content !== file.content, publicPaths: ['subjects/{subjectId}/taskBanks/{bankId}', 'subjects/{subjectId}/taskBanks/{bankId}/chunks/{chunkId}', 'system/promotions'], mode: process.argv.includes('--publish') ? 'publish' : 'dry-run' }));
  if (!process.argv.includes('--publish') || content === file.content) return;
  const current = (await client.request({ url: base + releaseName })).data;
  if (current.rulesetName !== release.rulesetName) throw Error('Deployed rules changed concurrently; retry after review');
  const created = (await client.request({ url: base + 'projects/jasne-7efe7/rulesets', method: 'POST', data: { source: { files: ruleset.source.files.map(source => source === file ? { ...source, content } : source) } } })).data;
  await client.request({ url: base + releaseName, method: 'PATCH', data: { release: { name: releaseName, rulesetName: created.name }, updateMask: 'ruleset_name' } });
  console.log('Published only the scoped public curriculum rule additions.');
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
