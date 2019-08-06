const https = require('https');
const { exec } = require('child_process');
const query = `
  query {
    user(login: "GalMunGral") {
      repositories(ownerAffiliations: OWNER, first: 50) {
        nodes {
          name
          url
        }
      }
    }
  }
`;
let req = https.request('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.10 Safari/537.36',
    'Authorization': 'bearer 390a4becf1485ab26bc28ed948ffc24b6d8ce7d5',
    'Content-Type': 'application/json'
  }
}, (res) => {
  let buffer = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    buffer += chunk;
  });
  res.on('end', () => {
    let { data } = JSON.parse(buffer);
    let repos = data.user.repositories.nodes;
    repos.forEach(repo => {
      exec('./create_frontmatter.sh', {
        env: Object.assign({
          REPO_URL: repo.url,
          PAGE_PATH: repo.name
        }, process.env)
      }, (err, stdout, stderr) => {
        if (err) console.log(err);
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);
      });
    });
  });
});
req.end(JSON.stringify({ query }));
