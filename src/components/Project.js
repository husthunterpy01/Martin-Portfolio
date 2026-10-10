import React, { useCallback, useMemo, useState } from 'react';
import { PiArrowRight, PiPenNib } from 'react-icons/pi';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { triggerCat } from './PixelCat';
import chatbotImg from '../image/proj_image/chatbot_proj.png';
import movieMgmtImg from '../image/proj_image/movie_proj.png';
import beeImg from '../image/proj_image/bee_proj.png';
import nliImg from '../image/proj_image/nli_proj.png';
import defaultImg from '../image/proj_image/project_placeholder.png';
import swanflipImg from '../image/proj_image/swan_flip.png';
import avArchImg from '../image/proj_image/av_job_architecture.svg';
import avHandlingImg from '../image/proj_image/av_job_handling.svg';

// TODO: replace with your real blog URL once it's live
const BLOG_URL = 'https://github.com/husthunterpy01';

// Clickable regions of the architecture diagram (percent of the image).
const AV_HOTSPOTS = [
  { id: 'sources', title: 'Source systems', x: 0, y: 13, w: 8, h: 65,
    text: 'Public job ads from autonomous vehicle employers such as Waymo, Motional, Wayve and TIER IV, published on ATS platforms (Greenhouse, Lever, Ashby, SmartRecruiters). 38 ATS sources in total.' },
  { id: 'ingest', more: true, title: 'Ingest', x: 8, y: 39, w: 8.2, h: 13.5,
    text: 'Scrapers collect the raw postings from each employer and land them in the bronze layer.' },
  { id: 'bronze', more: true, title: 'Bronze: raw postings', x: 20.4, y: 35, w: 6.2, h: 34,
    text: 'Raw scraped postings stored as they arrive in MinIO object storage, so every later step can be replayed.' },
  { id: 'dbt1', title: 'dbt: bronze to silver', x: 26.6, y: 38, w: 6.4, h: 17,
    text: 'Built the dbt models that clean and deduplicate raw postings into silver tables, with schema and uniqueness tests across the 38 ATS sources.' },
  { id: 'silver', title: 'Silver: cleaned postings', x: 33.2, y: 35, w: 6, h: 35,
    text: 'Cleaned, deduplicated postings in PostgreSQL, ready to be classified.' },
  { id: 'dbt2', title: 'dbt: silver to gold', x: 39.4, y: 38, w: 5.6, h: 17,
    text: 'A second dbt layer shapes the silver tables into the gold tables used by the application.' },
  { id: 'gold', title: 'Gold: analytics-ready data', x: 45.1, y: 35, w: 6.9, h: 35,
    text: 'PostgreSQL tables that back the job board and the skill-trend charts.' },
  { id: 'classify', more: true, title: 'Classifying job categories', x: 60.9, y: 23, w: 9.2, h: 21.5,
    text: 'A rule-based pre-filter plus a few-shot classifier (86% accuracy) screens out irrelevant postings before LLM inference with Groq, which keeps the pipeline viable on a near-zero budget.' },
  { id: 'labelled', more: true, title: 'Labelled job categories', x: 68.4, y: 13, w: 7.9, h: 10,
    text: 'LLM-generated job categories and skills landed in the backend relational schema. Over 1000 postings are classified and queryable in production.' },
  { id: 'chart', title: 'Skill-trend chart', x: 67.8, y: 66.5, w: 7.9, h: 10.5,
    text: 'Skill-trend charts (React Chart.js) show which skills the industry is hiring for, so students know what to learn next.' },
  { id: 'fastapi', title: 'FastAPI backend', x: 82.4, y: 25, w: 6.6, h: 15,
    text: 'The API that serves labelled jobs and skill trends to the web front end.' },
  { id: 'react', title: 'Web front end', x: 82.4, y: 50, w: 7.2, h: 16.7,
    text: 'The searchable job board and skill-trend dashboard that end users see.' },
  { id: 'ci', title: 'CI: lint, tests, build checks', x: 17.1, y: 87.5, w: 27.6, h: 11.5,
    text: 'GitHub Actions runs lint, tests and build checks on the backend, frontend and scrapers for every change.' },
  { id: 'cd', title: 'CD: deploy frontend', x: 50, y: 87.5, w: 27.6, h: 11.5,
    text: 'GitHub Actions deploys the frontend to Vercel and GitHub Pages.' },
];

// Sub-explanation shown under the diagram: how each scraped posting is handled.
const AV_DATA_FLOW = {
  title: 'How I handle the data',
  image: avHandlingImg,
  alt: 'Job posting handling flow: each posting fans out into salary, classification and skills branches',
  intro:
    'Each scraped posting fans out into three independent branches instead of passing through one long chain.',
  branches: [
    { name: 'Salary', steps: 'Salary API + HTML extraction', output: 'Silver layer' },
    {
      name: 'Classification',
      steps: 'Regex pre-filter, few-shot classifier, hand-off of AV jobs, then LLM + regex category definition',
      output: 'Silver layer',
    },
    { name: 'Skills', steps: 'Regex skill extraction', output: 'Star schema (gold layer)' },
  ],
  reasons: [
    ['Cheap, deterministic steps first', 'The regex pre-filter and few-shot classifier drop clearly non-AV roles before the LLM sees them, so only the hand-off set pays for LLM calls.'],
    ['LLM and regex together', 'The LLM handles ambiguous titles; regex rules keep the category taxonomy consistent and auditable.'],
    ['Independent branches', 'Salary, classification and skills do not depend on each other, so one failing (for example an LLM outage) does not block the others, and each can be re-run on its own.'],
    ['Regex for skills, not the LLM', 'Skill matching is a fixed vocabulary lookup, which is repeatable and free to re-run over the whole bronze history.'],
  ],
  messy: [
    ['38 companies on different sources: 30 ATS APIs, 7 HTML pages and 1 XML feed', 'Store every raw payload untouched in MinIO and bronze.raw_responses (JSONB), then parse each source with its own dbt model.'],
    ['Fields are inconsistent or missing across sources', 'Keep optional fields nullable and normalise only in silver, so raw evidence is never lost.'],
    ['The row id is a volatile row_number() between runs', 'Use the ATS-native posting id (falling back to the URL, then a content hash) for joins and cross-run comparison.'],
  ],
  footer:
    'Because bronze keeps the raw responses, any parser, classifier or skill list can be changed and re-run over the whole history without scraping again.',
};

// Personal project data
export const projectData = [
  {
    title: 'Autonomous Vehicle Job Profiles',
    topic: 'MLOps & Data',
    meta: 'Team of 5, UWA CITS5206 capstone, July 2026 - Present',
    desc: 'A searchable job board and skill-trend dashboard that answers what the autonomous vehicle industry is hiring for and which skills students should learn next. It collects public job ads from employer ATS platforms (Greenhouse, Lever, Ashby, SmartRecruiters) and classifies them with an LLM.',
    bullets: [
      'Developed dbt models that transform raw scraped postings (bronze) into cleaned, deduplicated silver tables, with schema and uniqueness tests across 38 ATS sources.',
      'Combined a rule-based pre-filter with a few-shot classifier (86% accuracy) to screen out irrelevant postings before LLM inference, keeping the pipeline viable on a near-zero budget.',
      'Landed LLM-generated job categories and skills into the backend relational schema, with over 1000 postings classified and queryable in production.',
    ],
    tech: ['Python', 'dbt', 'FastAPI', 'PostgreSQL', 'NextJs', 'Docker', 'Github Actions'],
    github: 'https://github.com/husthunterpy01/Autonomous_Vehicle_Job_Profiles_Group3',
    live: 'https://av-7cczgq783-husthunterpy01s-projects.vercel.app',
    img: avArchImg,
    imgContain: true,
    hotspots: AV_HOTSPOTS,
    dataFlow: AV_DATA_FLOW,
    featured: true,
  },
  {
    title: 'Swanflip Marketplace: a UWA marketplace for students',
    topic: 'Web & Apps',
    meta: 'Team of 3, Mar 2026 - May 2026',
    bullets: [
      'Architected a Flask/SQLAlchemy peer-to-peer marketplace with a service-layer pattern (auth, geolocation, chat, notification, pagination), Alembic migrations, and Socket.IO real-time chat and notifications.',
      'Integrated Geoapify geocoding with Haversine-based proximity filtering for location-aware listings.',
      'Wrote unit and Selenium integration tests against a temporary live server and a seeded test database.',
    ],
    tech: ['Flask', 'SQLAlchemy', 'SocketIO', 'Sqlite', 'Selenium', 'TailwindCSS'],
    github: 'https://github.com/husthunterpy01/SwanFlip-Marketplace' ,
    live: '',
    img: swanflipImg
  },
  {
    title: 'RAG Chatbot Summarisation System',
    topic: 'AI & ML',
    meta: 'Nov 2024 - Jan 2025',
    bullets: [
      'Built a RAG chatbot that grounds a local Granite LLM in user documents through FastAPI and Streamlit, for Ecommerce customer support.',
      'Fine-tuned a BART model on SamSum/TweetSum for dialogue summarisation to reduce input tokens.',
      'Improved retrieval with hybrid (vector + keyword) search and semantic chunking over a MongoDB Atlas vector store.',
    ],
    tech: ['Python', 'Pytorch', 'FastAPI', 'HuggingFace', 'MongoDB', 'Streamlit'],
    live: '#',
    github: 'https://github.com/husthunterpy01/Dialog-Summarization-System',
    img: chatbotImg
  },
  {
    title: 'Natural Language Inference with ESIM-based model',
    topic: 'AI & ML',
    desc: 'Developed and evaluated multiple deep learning architectures for a Natural Language Inference (NLI) task using a novel dataset built from science-exam questions and web sentences. The work focused on architecture innovation, ablation studies (particularly attention mechanisms), and qualitative interpretation of attention behaviour.',
    tech: ['Python', 'Pytorch', 'Nltk'],
    github: 'https://github.com/husthunterpy01/CITS4012/tree/main/Assignment2',
    live: '',
    img: nliImg
  },
  {
    title: 'Bee Sound Identification System',
    topic: 'AI & ML',
    desc: 'A published deep learning research project that analyses hive audio using spectrograms and CNN models to classify bee colony health states. Accepted and published in Ecological Informatics (Elsevier, 2023).',
    tech: ['Python', 'Pytorch', 'Librosa', 'Wandb'],
    github: '#',
    live: 'https://doi.org/10.1016/j.ecoinf.2023.102274',
    img: beeImg
  },
  {
    title: 'MLOps systems for GraphRAG of YouTube script analysis',
    topic: 'MLOps & Data',
    desc: 'Coming soon.',
    tech: ['FastAPI','Nginx','Docker','AWS', 'Kubeflow', 'Ansible', 'Pytorch','Flink'],
    github: '' ,
    live: '',
    img: defaultImg
  },
  {
    title: 'Movie Management System',
    topic: 'Web & Apps',
    desc: 'A desktop application for managing movie collections, including features for adding, editing, and deleting movie entries.',
    tech: ['JavaSwing', 'MySQL'],
    live: '#',
    github: 'https://github.com/husthunterpy01/Movie-Recommendation-System',
    img: movieMgmtImg
  },
];

const TOPICS = ['All', 'AI & ML', 'Web & Apps', 'MLOps & Data'];

const Projects = () => {
  const [topic, setTopic] = useState('All');
  const [selected, setSelected] = useState(null);
  const closeModal = useCallback(() => setSelected(null), []);

  const filtered = useMemo(
    () =>
      topic === 'All'
        ? projectData
        : projectData.filter((p) => p.topic === topic),
    [topic]
  );

  return (
    <section id="projects" className="section page">
      <div className="container">
        <div className="reveal">
          <h1 className="page-title">My Projects</h1>
          <p className="page-intro">
            Data pipelines, full-stack apps and machine learning work, from
            team projects to published research.
          </p>
        </div>

        <div
          className="filters"
          role="group"
          aria-label="Filter projects by topic"
        >
          {TOPICS.map((t) => {
            const count =
              t === 'All'
                ? projectData.length
                : projectData.filter((p) => p.topic === t).length;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={topic === t}
                className={`filter ${topic === t ? 'active' : ''}`}
                onClick={() => setTopic(t)}
              >
                {t}
                <span className="filter-count">{count}</span>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <p className="empty-state">
            Nothing here yet. Pick another topic to see more work.
          </p>
        ) : (
          <div className="projects-grid" key={topic}>
            {filtered.map((proj) => (
              <ProjectCard
                key={proj.title}
                {...proj}
                onOpen={() => {
                  setSelected(proj);
                  triggerCat();
                }}
              />
            ))}
          </div>
        )}

        {selected && <ProjectModal project={selected} onClose={closeModal} />}

        <a
          href={BLOG_URL}
          target="_blank"
          rel="noreferrer"
          className="blog-callout reveal"
        >
          <PiPenNib className="blog-callout-icon" aria-hidden="true" />
          <span className="blog-callout-text">
            <strong>Curious how these work under the hood?</strong>
            <span>I write about the mechanics on my blog.</span>
          </span>
          <span className="blog-callout-cta">
            Visit my blog
            <PiArrowRight aria-hidden="true" />
          </span>
        </a>
      </div>
    </section>
  );
};

export default Projects;
