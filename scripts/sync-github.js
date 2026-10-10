// Snapshots public GitHub data into src/data/github.json for the Dashboard.
// Usage: npm run sync:github   (set GITHUB_TOKEN to lift the 60 req/hour limit)
const fs = require('fs');
const path = require('path');

const USER = 'husthunterpy01';
const OUT = path.join(__dirname, '..', 'src', 'data', 'github.json');
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'portfolio-sync' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const get = async (url) => {
  const res = await fetch(`https://api.github.com${url}`, { headers });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
};

const weekStart = (iso) => {
  const d = new Date(iso);
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7)); // Monday
  return d.toISOString().slice(0, 10);
};

(async () => {
  const [profile, allRepos] = await Promise.all([
    get(`/users/${USER}`),
    get(`/users/${USER}/repos?per_page=100&sort=pushed`),
  ]);
  const repos = allRepos.filter((r) => !r.fork && r.name !== USER);

  // Primary language per repo (byte totals are skewed by notebooks and generated files).
  const languages = {};
  repos.forEach((r) => {
    if (r.language) languages[r.language] = (languages[r.language] || 0) + 1;
  });

  // Commits authored by me over the last 26 weeks, across repos pushed in that window.
  const since = new Date(Date.now() - 26 * 7 * 864e5);
  const commits = [];
  for (const r of repos.filter((x) => new Date(x.pushed_at) > since)) {
    for (let page = 1; page <= 5; page += 1) {
      const batch = await get(
        `/repos/${USER}/${r.name}/commits?author=${USER}&since=${since.toISOString()}&per_page=100&page=${page}`
      );
      batch.forEach((c) =>
        commits.push({ repo: r.name, date: c.commit.author.date, message: c.commit.message.split('\n')[0] })
      );
      if (batch.length < 100) break;
    }
  }
  const commitsByWeek = {};
  commits.forEach((c) => {
    const w = weekStart(c.date);
    commitsByWeek[w] = (commitsByWeek[w] || 0) + 1;
  });
  const recent = commits.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);

  const data = {
    generatedAt: new Date().toISOString(),
    profile: {
      login: profile.login,
      url: profile.html_url,
      publicRepos: profile.public_repos,
      followers: profile.followers,
      createdAt: profile.created_at,
    },
    repos: repos.map((r) => ({
      name: r.name, url: r.html_url, description: r.description, language: r.language,
      stars: r.stargazers_count, pushedAt: r.pushed_at,
    })),
    languages,
    commitsByWeek,
    recent,
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Wrote ${OUT}: ${repos.length} repos, ${Object.keys(languages).length} languages, ${commits.length} commits`);
})().catch((e) => { console.error(e); process.exit(1); });
