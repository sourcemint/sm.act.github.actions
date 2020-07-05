
const PATH = require('path');
const FS = require('fs');
const CHILD_PROCESS = require('child_process');

if (!process.env.SM_ACT_SNAPSHOT_ID) {
    throw new Error(`'SM_ACT_SNAPSHOT_ID' not set!`);
}

const meta = {};
Object.keys(process.env).forEach(function (name) {
    if (!/^SM_ACT_/.test(name)) return;
    meta[name.replace(/^SM_ACT_/, '')] = process.env[name];
});

const path = PATH.join('._', 'gi0.Sourcemint.org~sm.act', 'snapshots', `${process.env.SM_ACT_SNAPSHOT_FSID}.json`);

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



console.log(CHILD_PROCESS.execSync(`git checkout -t origin/sm.act/snapshots || true`).toString());
console.log(CHILD_PROCESS.execSync(`git checkout -b sm.act/snapshots`).toString());

console.log(CHILD_PROCESS.execSync(`git branch`).toString());

console.log(CHILD_PROCESS.execSync(`git pull origin sm.act/snapshots || true`).toString());

console.log(CHILD_PROCESS.execSync(`git status`).toString());
