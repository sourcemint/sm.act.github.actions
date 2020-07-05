
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
    id7: process.env.SM_ACT_SNAPSHOT_ID7,
    hid: process.env.SM_ACT_SNAPSHOT_HID,
    fsid: process.env.SM_ACT_SNAPSHOT_FSID,
    artifacts: {
        url: `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}/artifacts`
    },
    meta: meta,
    env: process.env
}, null, 4), 'utf8');

console.log(`::set-output name=path::${path}`);

console.log(`Snapshot ID: ${process.env.SM_ACT_SNAPSHOT_ID}`);


let author = process.env.SM_ACT_GIT_COMMIT_AUTHOR.match(/^([^<]+)\s*<([^>]*)>$/);
if (author) {
    author[1] = author[1] || process.env.SM_ACT_ACTOR_URI;
    author[2] = author[2] || 'unknown';
} else {
    author = [null, process.env.SM_ACT_ACTOR_URI, 'unknown'];
}

console.log(CHILD_PROCESS.execSync(`git config user.name "${author[1]}"`).toString());
console.log(CHILD_PROCESS.execSync(`git config user.email "${author[2]}"`).toString());
console.log(CHILD_PROCESS.execSync(`git checkout -t origin/sm.act/snapshots || true`).toString());
console.log(CHILD_PROCESS.execSync(`git checkout -b sm.act/snapshots || true`).toString());
console.log(CHILD_PROCESS.execSync(`git pull origin sm.act/snapshots --rebase || true`).toString());
console.log(CHILD_PROCESS.execSync(`git add "${path}" && git commit -m "[gi0.Sourcemint.org/sm.act.github.actions] New snapshot: ${process.env.SM_ACT_SNAPSHOT_ID}"`).toString());
console.log(CHILD_PROCESS.execSync(`git push origin sm.act/snapshots`).toString());
