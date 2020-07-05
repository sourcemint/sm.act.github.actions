
const FS = require('fs');

if (!process.env.SM_ACT_SNAPSHOT_ID) {
    throw new Error(`'SM_ACT_SNAPSHOT_ID' not set!`);
}

console.log(`Snapshot ID: ${process.env.SM_ACT_SNAPSHOT_ID}`);

const meta = {};
Object.keys(process.env).forEach(function (name) {
    if (!/^SM_ACT_/.test(name)) return;
    meta[name.replace(/^SM_ACT_/, '')] = process.env[name];
});

FS.writeFileSync('snapshot.json', JSON.stringify({
    id: process.env.SM_ACT_SNAPSHOT_ID,
    meta: meta,
    env: process.env
    // TODO: Add files.
}, null, 4), 'utf8');
