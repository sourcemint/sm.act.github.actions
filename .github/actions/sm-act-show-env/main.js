
function heading (str) {
    console.log(`${str}:`);
}
function envsForPrefix (prefix) {
    Object.keys(process.env).forEach(function (name) {
        if (name.substr(0, prefix.length) !== prefix) return;
        console.log(`  ${name}=${process.env[name]}`);
    });
}


heading(`SM_*`);
envsForPrefix(`SM_`);

heading(`GITHUB_*`);
envsForPrefix(`GITHUB_`);

heading(`*`);
envsForPrefix(``);

// # git fetch origin
// # git config --global user.email "you@email.com"
// # git config --global user.name "Name"
// pwd
// ls -al
// git status
// git remote show origin
// # touch README.md
// # git add README.md
// # git commit -m "readme"
// # git push origin master
