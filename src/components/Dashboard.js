import React, { useMemo, useState } from 'react';
import { projectData } from './Project';
import { experiences, volunteers } from './Experience';
import github from '../data/github.json';

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

// "Nov 2025 - Mar 2026" / "July 2026 - Present" -> fractional-month indices.
const parseMonth = (s) => {
  if (/present/i.test(s)) {
    const now = new Date();
    return now.getFullYear() * 12 + now.getMonth() + 1;
  }
  const [m, y] = s.trim().split(/\s+/);
  return Number(y) * 12 + MONTHS.indexOf(m.slice(0, 3).toLowerCase()) + 1;
};

const parsePeriod = (period) => {
  const [a, b] = period.split(/\s+-\s+/);
  return { start: parseMonth(a), end: parseMonth(b || a) };
};

const TOPIC_SLOT = { 'AI & ML': 1, 'Web & Apps': 2, 'MLOps & Data': 3 };

const useTooltip = () => {
  const [tip, setTip] = useState(null);
  const show = (e, content) => {
    const box = e.currentTarget.closest('.viz-chart').getBoundingClientRect();
    const r = e.currentTarget.getBoundingClientRect();
    setTip({ content, x: r.left - box.left + r.width / 2, y: r.top - box.top });
  };
  const hide = () => setTip(null);
  return { tip, show, hide };
};

const Tooltip = ({ tip }) =>
  tip ? (
    <div className="viz-tooltip" role="status" style={{ left: tip.x, top: tip.y }}>
      {tip.content}
    </div>
  ) : null;

const Stat = ({ value, label }) => (
  <div className="viz-stat tilt" data-tilt="8">
    <span className="viz-stat-value">{value}</span>
    <span className="viz-stat-label">{label}</span>
  </div>
);

const TechChart = ({ rows }) => {
  const { tip, show, hide } = useTooltip();
  const max = rows[0].projects.length;
  return (
    <div className="viz-chart">
      <ul className="viz-bars">
        {rows.map(({ name, projects }) => (
          <li
            key={name}
            className="viz-bar-row"
            tabIndex={0}
            onMouseEnter={(e) => show(e, <><strong>{name}</strong><br />{projects.join(', ')}</>)}
            onFocus={(e) => show(e, <><strong>{name}</strong><br />{projects.join(', ')}</>)}
            onMouseLeave={hide}
            onBlur={hide}
          >
            <span className="viz-bar-label">{name}</span>
            <span className="viz-bar-track">
              <span
                className="viz-bar viz-bar--1"
                style={{ width: `${(projects.length / max) * 100}%` }}
              />
            </span>
            <span className="viz-bar-value">{projects.length}</span>
          </li>
        ))}
      </ul>
      <Tooltip tip={tip} />
      <details className="viz-table">
        <summary>View as table</summary>
        <table>
          <thead><tr><th>Technology</th><th>Projects</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}><td>{r.name}</td><td>{r.projects.length}</td></tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
};

const TopicChart = ({ rows }) => {
  const { tip, show, hide } = useTooltip();
  const max = Math.max(...rows.map((r) => r.titles.length));
  return (
    <div className="viz-chart">
      <ul className="viz-bars">
        {rows.map(({ topic, titles }) => {
          const content = <><strong>{topic}</strong><br />{titles.join(', ')}</>;
          return (
            <li
              key={topic}
              className="viz-bar-row"
              tabIndex={0}
              onMouseEnter={(e) => show(e, content)}
              onFocus={(e) => show(e, content)}
              onMouseLeave={hide}
              onBlur={hide}
            >
              <span className="viz-bar-label">{topic}</span>
              <span className="viz-bar-track">
                <span
                  className={`viz-bar viz-bar--${TOPIC_SLOT[topic] || 1}`}
                  style={{ width: `${(titles.length / max) * 100}%` }}
                />
              </span>
              <span className="viz-bar-value">{titles.length}</span>
            </li>
          );
        })}
      </ul>
      <Tooltip tip={tip} />
    </div>
  );
};

const CareerChart = ({ items }) => {
  const { tip, show, hide } = useTooltip();
  const min = Math.min(...items.map((i) => i.start));
  const maxEnd = Math.max(...items.map((i) => i.end));
  const span = maxEnd - min;
  const firstYear = Math.floor((min - 1) / 12);
  const lastYear = Math.floor((maxEnd - 1) / 12);
  const years = [];
  for (let y = firstYear; y <= lastYear; y += 1) years.push(y);
  const pos = (m) => ((m - min) / span) * 100;

  return (
    <div className="viz-chart">
      <div className="viz-gantt">
        <div className="viz-gantt-axis" aria-hidden="true">
          {years.map((y) => (
            <span key={y} style={{ left: `${Math.max(0, pos(y * 12 + 1))}%` }}>{y}</span>
          ))}
        </div>
        {items.map((it) => {
          const content = (
            <>
              <strong>{it.title}</strong>
              <br />{it.org}
              <br />{it.period}
            </>
          );
          return (
            <div className="viz-gantt-row" key={`${it.org}-${it.period}`}>
              <span className="viz-bar-label">{it.org}</span>
              <span className="viz-gantt-track">
                <span
                  className={`viz-bar viz-gantt-bar viz-bar--${it.kind === 'Volunteer' ? 3 : 1}`}
                  tabIndex={0}
                  style={{ left: `${pos(it.start)}%`, width: `${Math.max(pos(it.end) - pos(it.start), 1.2)}%` }}
                  onMouseEnter={(e) => show(e, content)}
                  onFocus={(e) => show(e, content)}
                  onMouseLeave={hide}
                  onBlur={hide}
                  aria-label={`${it.title}, ${it.org}, ${it.period}`}
                />
              </span>
            </div>
          );
        })}
      </div>
      <Tooltip tip={tip} />
      <div className="viz-legend" aria-label="Legend">
        <span><i className="viz-swatch viz-bar--1" />Work</span>
        <span><i className="viz-swatch viz-bar--3" />Volunteer</span>
      </div>
    </div>
  );
};

const mondayOf = (d) => {
  const x = new Date(d);
  x.setUTCHours(0, 0, 0, 0);
  x.setUTCDate(x.getUTCDate() - ((x.getUTCDay() + 6) % 7));
  return x;
};

const WEEKS = 26;

const CommitChart = ({ weeks }) => {
  const { tip, show, hide } = useTooltip();
  const max = Math.max(...weeks.map((w) => w.count), 1);
  return (
    <div className="viz-chart">
      <div className="viz-cols" role="list">
        {weeks.map((w) => {
          const content = (
            <>
              <strong>{w.count} commit{w.count === 1 ? '' : 's'}</strong>
              <br />week of {w.label}
            </>
          );
          return (
            <div
              key={w.key}
              role="listitem"
              className="viz-col"
              tabIndex={0}
              aria-label={`Week of ${w.label}: ${w.count} commits`}
              onMouseEnter={(e) => show(e, content)}
              onFocus={(e) => show(e, content)}
              onMouseLeave={hide}
              onBlur={hide}
            >
              <span
                className="viz-bar viz-bar--1 viz-col-bar"
                style={{ height: w.count ? `${Math.max((w.count / max) * 100, 4)}%` : '2px', opacity: w.count ? 1 : 0.25 }}
              />
            </div>
          );
        })}
      </div>
      <div className="viz-col-axis" aria-hidden="true">
        <span>{weeks[0].label}</span>
        <span>{weeks[weeks.length - 1].label}</span>
      </div>
      <Tooltip tip={tip} />
    </div>
  );
};

const Dashboard = () => {
  const data = useMemo(() => {
    const live = projectData.filter((p) => p.desc !== 'Coming soon.');

    const techMap = {};
    live.forEach((p) =>
      (p.tech || []).forEach((t) => {
        (techMap[t] = techMap[t] || []).push(p.title);
      })
    );
    const techRows = Object.entries(techMap)
      .map(([name, projects]) => ({ name, projects }))
      .sort((a, b) => b.projects.length - a.projects.length || a.name.localeCompare(b.name))
      .slice(0, 10);

    const topicMap = {};
    live.forEach((p) => {
      (topicMap[p.topic] = topicMap[p.topic] || []).push(p.title);
    });
    const topicRows = Object.entries(topicMap)
      .map(([topic, titles]) => ({ topic, titles }))
      .sort((a, b) => b.titles.length - a.titles.length);

    const career = [
      ...experiences.map((e) => ({ ...e, kind: 'Work' })),
      ...volunteers.map((e) => ({ ...e, kind: 'Volunteer' })),
    ]
      .map((e) => ({ ...e, ...parsePeriod(e.period) }))
      .sort((a, b) => a.start - b.start);

    const allTech = new Set(live.flatMap((p) => p.tech || []));
    const workMonths = experiences
      .map((e) => parsePeriod(e.period))
      .reduce((sum, p) => sum + (p.end - p.start), 0);

    const first = mondayOf(Date.now() - (WEEKS - 1) * 7 * 864e5);
    const weeks = Array.from({ length: WEEKS }, (_, i) => {
      const d = new Date(first.getTime() + i * 7 * 864e5);
      const key = d.toISOString().slice(0, 10);
      return {
        key,
        count: github.commitsByWeek[key] || 0,
        label: d.toLocaleDateString('en-AU', { day: 'numeric', month: 'short', timeZone: 'UTC' }),
      };
    });
    const totalCommits = weeks.reduce((n, w) => n + w.count, 0);
    const activeWeeks = weeks.filter((w) => w.count > 0).length;

    const langs = Object.entries(github.languages).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    const langRows = langs.slice(0, 8).map(([name]) => ({
      name,
      projects: github.repos.filter((r) => r.language === name).map((r) => r.name),
    }));

    return { weeks, totalCommits, activeWeeks, langRows, live, techRows, topicRows, career, techCount: allTech.size, workYears: (workMonths / 12).toFixed(1) };
  }, []);

  return (
    <section id="dashboard" className="section page">
      <div className="container viz-root">
        <div className="reveal">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-intro">
            A data view of my work: what I build with, what I build, and where I have been building it.
          </p>
        </div>

        <div className="viz-stats reveal">
          <Stat value={data.live.length} label="Projects" />
          <Stat value={data.techCount} label="Technologies" />
          <Stat value={experiences.length + volunteers.length} label="Roles" />
          <Stat value={`${data.workYears}y`} label="Work experience" />
        </div>

        <div className="viz-grid">
          <article className="viz-card tilt reveal">
            <h2 className="viz-title">Most-used technologies</h2>
            <p className="viz-sub">Number of projects using each, top 10</p>
            <TechChart rows={data.techRows} />
          </article>

          <article className="viz-card tilt reveal">
            <h2 className="viz-title">Projects by topic</h2>
            <p className="viz-sub">Hover a bar to see which projects</p>
            <TopicChart rows={data.topicRows} />
          </article>

          <article className="viz-card viz-card--wide reveal">
            <h2 className="viz-title">Career timeline</h2>
            <p className="viz-sub">Work and volunteer roles over time</p>
            <CareerChart items={data.career} />
          </article>
        </div>

        <div className="viz-section-head reveal">
          <h2 className="viz-section-title">Live from GitHub</h2>
          <a href={github.profile.url} target="_blank" rel="noreferrer" className="viz-section-link">
            @{github.profile.login}
          </a>
        </div>

        <div className="viz-stats reveal">
          <Stat value={github.repos.length} label="Original repositories" />
          <Stat value={data.totalCommits} label={`Commits, last ${WEEKS} weeks`} />
          <Stat value={`${data.activeWeeks}/${WEEKS}`} label="Weeks with commits" />
          <Stat value={github.profile.followers} label="Followers" />
        </div>

        <div className="viz-grid">
          <article className="viz-card viz-card--wide reveal">
            <h2 className="viz-title">Weekly commits</h2>
            <p className="viz-sub">Commits I authored across my public repositories, per week</p>
            <CommitChart weeks={data.weeks} />
          </article>

          <article className="viz-card tilt reveal">
            <h2 className="viz-title">Repositories by language</h2>
            <p className="viz-sub">Primary language of each original public repo</p>
            <TechChart rows={data.langRows} />
          </article>

          <article className="viz-card tilt reveal">
            <h2 className="viz-title">Latest commits</h2>
            <p className="viz-sub">Most recent public activity</p>
            <ul className="viz-feed">
              {github.recent.map((c) => (
                <li key={c.date}>
                  <a href={`${github.profile.url}/${c.repo}`} target="_blank" rel="noreferrer">
                    {c.repo.replace(/_/g, ' ')}
                  </a>
                  <span>{c.message}</span>
                  <time dateTime={c.date}>
                    {new Date(c.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
                  </time>
                </li>
              ))}
            </ul>
          </article>
        </div>
        <p className="viz-foot">
          GitHub data snapshot from {new Date(github.generatedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}.
        </p>
      </div>
    </section>
  );
};

export default Dashboard;
