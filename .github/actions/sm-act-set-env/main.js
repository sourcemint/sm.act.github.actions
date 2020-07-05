
const MOMENT = require('moment');

function getEnv (name) {
    return process.env[name] || undefined;
}
function setEnv (name, value) {
    process.env[name] = value;
    process.stdout.write(`::set-env name=${name}::${value}\n`);
}


setEnv('SM_ACT_GIT_REMOTE', `git@github.com:${getEnv('GITHUB_REPOSITORY')}.git`);
setEnv('SM_ACT_GIT_REF', getEnv('GITHUB_REF'));
setEnv('SM_ACT_GIT_SHA', getEnv('GITHUB_SHA'));
setEnv('SM_ACT_GIT_SHA7', getEnv('GITHUB_SHA').substr(0, 7));
setEnv('SM_ACT_RUN_ID', getEnv('GITHUB_RUN_ID'));
setEnv('SM_ACT_ACTOR_URI', `github.com/${getEnv('GITHUB_ACTOR')}`);
setEnv('SM_ACT_TRIGGER_EVENT', getEnv('GITHUB_JOB'));
setEnv('SM_ACT_JOB_NAME', getEnv('GITHUB_JOB'));
setEnv('SM_ACT_PACKAGE_URI', `github.com/${getEnv('GITHUB_REPOSITORY')}`);

if (/^refs\/tags\//.test(getEnv('GITHUB_REF'))) {
    setEnv('SM_ACT_GIT_TAG', getEnv('GITHUB_REF').replace(/^refs\/tags\//, ''));
} else
if (/^refs\/heads\//.test(getEnv('GITHUB_REF'))) {
    setEnv('SM_ACT_GIT_BRANCH', getEnv('GITHUB_REF').replace(/^refs\/heads\//, ''));

}

const time = MOMENT();
setEnv('SM_ACT_SNAPSHOT_ID', [
    time.format('YYMM'),
    getEnv('SM_ACT_PACKAGE_URI'),
    getEnv('SM_ACT_RUN_ID'),
    getEnv('SM_ACT_GIT_SHA7'),
    time.format('DDHHmmss'),
    getEnv('SM_ACT_GIT_BRANCH'),
    getEnv('SM_ACT_ACTOR_URI')
].join(':'));
