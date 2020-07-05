
const PATH = require('path');
const FS = require('fs');

if (!process.env.SM_ACT_SNAPSHOT_ID) {
    throw new Error(`'SM_ACT_SNAPSHOT_ID' not set!`);
}

const meta = {};
Object.keys(process.env).forEach(function (name) {
    if (!/^SM_ACT_/.test(name)) return;
    meta[name.replace(/^SM_ACT_/, '')] = process.env[name];
});

const path = PATH.join('#!', 'gi0.Sourcemint.org', 'snapshots', `${process.env.SM_ACT_SNAPSHOT_FSID}.json`);

if (!FS.existsSync(PATH.dirname(path))) FS.mkdirSync(PATH.dirname(path), { recursive: true });
FS.writeFileSync(path, JSON.stringify({
    id: process.env.SM_ACT_SNAPSHOT_ID,
    hid: process.env.SM_ACT_SNAPSHOT_HID,
    fsid: process.env.SM_ACT_SNAPSHOT_FSID,
    meta: meta,
    env: process.env
    // TODO: Add files.
}, null, 4), 'utf8');

console.log(`::set-output name=path::${path}`);

console.log(`Snapshot ID: ${process.env.SM_ACT_SNAPSHOT_ID}`);
