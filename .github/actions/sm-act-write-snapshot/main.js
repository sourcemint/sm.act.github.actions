
const PATH = require('path');
const FS = require('fs');
const CHILD_PROCESS = require('child_process');

if (!process.env.SM_ACT_SNAPSHOT_ID) {
    throw new Error(`'SM_ACT_SNAPSHOT_ID' not set!`);
}

function writeFile (path, content) {
    console.log('[sm.act] Writing file to:', path);
    if (!FS.existsSync(PATH.dirname(path))) FS.mkdirSync(PATH.dirname(path), { recursive: true });
    FS.writeFileSync(path, content, 'utf8');
}

function runCommand (command) {
    console.log('[sm.act] Running:', command);
    const result = CHILD_PROCESS.execSync(command);
    console.log(result.toString());
    return result;
}

const branchName = '_/gi0.Sourcemint.org-sm.act/snapshots';

let author = process.env.SM_ACT_GIT_COMMIT_AUTHOR.match(/^([^<]+)\s*<([^>]*)>$/);
if (author) {
    author[1] = author[1] || process.env.SM_ACT_ACTOR_URI;
    author[2] = author[2] || 'unknown';
} else {
    author = [null, process.env.SM_ACT_ACTOR_URI, 'unknown'];
}

const meta = {};
Object.keys(process.env).forEach(function (name) {
    if (!/^SM_ACT_/.test(name)) return;
    meta[name.replace(/^SM_ACT_/, '')] = process.env[name];
});


// '._' is for 100% auto-generated and managed files.
// These paths are cross-clone merge safe. They are also globally unique and thus cross-repository collation safe.

// The report that identifies the snapshot.
const reportPath = PATH.join('._', 'gi0.Sourcemint.org~sm.act', 'snapshots', `${process.env.SM_ACT_SNAPSHOT_FSID}.json`);
// An easy to poll path to hold a referenace to the latest snapshot.
const latestPath = PATH.join('._', 'gi0.Sourcemint.org~sm.act', 'snapshots-latest', `${process.env.SM_ACT_FSID}`);
const mappingPaths = [
    // A mapping to resolve id to fsid.
    PATH.join('._', 'gi0.Sourcemint.org~sm.act', 'snapshots-id', `${process.env.SM_ACT_SNAPSHOT_ID}`),
    // A mapping to resolve hashid to fsid.
    PATH.join('._', 'gi0.Sourcemint.org~sm.act', 'snapshots-hid', `${process.env.SM_ACT_SNAPSHOT_HID}`),
    // A mapping to resolve short id to fsid.
    PATH.join('._', 'gi0.Sourcemint.org~sm.act', 'snapshots-id7', `${process.env.SM_ACT_SNAPSHOT_ID7}`)
];

runCommand(`git config user.name "${author[1]}"`);
runCommand(`git config user.email "${author[2]}"`);
runCommand(`git config pull.rebase false`);

const sourceBranchName = runCommand(`git rev-parse --abbrev-ref HEAD`).toString().replace(/\n$/, '');

console.log(`[sm.act] Source branch name:`, sourceBranchName);


runCommand(`git reset --hard`);

runCommand(`git checkout -t origin/${branchName} || true`);

runCommand(`git checkout --orphan ${branchName} || true`);

// // @source https://stackoverflow.com/a/3364506
// runCommand(`git merge -X theirs ${sourceBranchName} || true`);

runCommand(`git fetch origin ${branchName} || true`);

try {
    runCommand(`git merge -X theirs origin/${branchName}`);
} catch (err) {
    if (/refusing to merge unrelated histories/.test(err.message)) {
        console.error(`\n\n\n[sm.act] ERROR: It appears we are not dealing with a complete git history. Make sure 'actions/checkout@v2' is configured with 'fetch-depth: 0'.\n\n\n`);
        throw err;
    }
}

runCommand(`git status`);

writeFile(reportPath, JSON.stringify({
    aspect: process.env.SM_ACT_SNAPSHOT_ASPECT,
    aspectOf: process.env.SM_ACT_SNAPSHOT_ASPECT_OF,
    id: process.env.SM_ACT_SNAPSHOT_ID,
    id7: process.env.SM_ACT_SNAPSHOT_ID7,
    hid: process.env.SM_ACT_SNAPSHOT_HID,
    fsid: process.env.SM_ACT_SNAPSHOT_FSID,
    logs: {     // The logs that lead to the generation of the snapshot.
        url: `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}/logs`
    },
    artifacts: {    // The content of the snapshot
        url: `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}/artifacts`
    },
    meta: meta,
    env: process.env
}, null, 4));

writeFile(latestPath, PATH.relative(PATH.dirname(latestPath), reportPath));
mappingPaths.forEach(function (path) {
    writeFile(path, PATH.relative(PATH.dirname(path), reportPath));
});

runCommand(`git add "${reportPath}"`);
runCommand(`git add "${latestPath}"`);
mappingPaths.forEach(function (path) {
    runCommand(`git add "${path}"`);
});

runCommand(`git status`);

runCommand(`git commit -m "[gi0.Sourcemint.org/sm.act.github.actions] New snapshot: ${process.env.SM_ACT_SNAPSHOT_ID}"`);

runCommand(`git status`);

let retryCount = 0;
let maxRetries = 5;
function push () {

    try {
        runCommand(`git push origin ${branchName}`);
    } catch (err) {
        if (/failed to push some refs to/.test(err.stderr.toString())) {

            retryCount += 1;
            if (retryCount <= maxRetries) {

                runCommand(`git pull origin ${branchName} || true`);

                console.error(`Error pushing changes. Re-trying (${retryCount}/${maxRetries}).`);

                setTimeout(push, Math.round(Math.random() * 1000) * 3);
                return;
            }
            console.error(`Error pushing changes. Not re-trying again.`);
        }
        throw err;
    }
}

push();


runCommand(`git checkout ${sourceBranchName}`);


console.log(`Snapshot ID: ${process.env.SM_ACT_SNAPSHOT_ID}`);


console.log(`::set-output name=reportPath::${reportPath}`);
console.log(`::set-output name=latestPath::${latestPath}`);
console.log(`::set-output name=branchName::${latestPath}`);
