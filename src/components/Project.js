import React, { useMemo, useState } from 'react';
import { FaArrowRight, FaPenNib, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProjectCard from './ProjectCard';
import chatbotImg from '../image/proj_image/chatbot_proj.png';
import movieMgmtImg from '../image/proj_image/movie_proj.png';
import beeImg from '../image/proj_image/bee_proj.png';
import nliImg from '../image/proj_image/nli_proj.png';
import defaultImg from '../image/proj_image/project_placeholder.png';
import swanflipImg from '../image/proj_image/swan_flip.png';

// TODO: replace with your real blog URL once it's live
const BLOG_URL = 'https://github.com/husthunterpy01';

// Personal project data
const projectData = [
  {
    title: 'RAG Summary Chatbot System',
    topic: 'AI & ML',
    desc: 'A retrieval-augmented generation (RAG) chatbot that provides concise summaries from large documents for Ecommerce customer support.',
    tech: ['Python', 'Pytorch', 'MongoDB', 'Streamlit'],
    live: '#',
    github: 'https://github.com/husthunterpy01/Dialog-Summarization-System',
    img: chatbotImg
  },
    {
    title: 'Natural Language Inference with ESIM-based model',
    topic: 'AI & ML',
    desc: 'Developed and evaluated multiple deep learning architectures for a Natural Language Inference (NLI) task using a novel dataset constructed from science-exam questions and web sentences. The goal was to determine entailment relations between premise–hypothesis pairs, focusing not just on model performance but on architecture innovation, ablation studies (particularly attention mechanisms), and qualitative interpretation of attention behaviour.',
    tech: ['Python', 'Pytorch', 'Nltk'],
    github: 'https://github.com/husthunterpy01/CITS4012/tree/main/Assignment2',        
    live: '', 
    img: nliImg
  },
  {
    title: 'MLops systems for GraphRag of youtube script analysis',
    topic: 'MLOps & Data',
    desc: 'Coming soon.',
    tech: ['FastAPI','Nginx','Docker','AWS', 'Kubeflow', 'Ansible', 'Pytorch','Flink'],
    github: '' ,
    live: '',
    img: defaultImg
  },
  {
    title: 'Swanflip Marketplace - a UWA marketplace for students',
    topic: 'Web & Apps',
    desc: 'Developed a full-stack web application for UWA students to buy and sell second-hand items, featuring user authentication, product listings, search functionality, and a responsive design.',
    tech: ['Flask', 'SocketIO', 'Sqlite', 'TailwindCSS'],
    github: 'https://github.com/husthunterpy01/SwanFlip-Marketplace' ,
    live: '',
    img: swanflipImg
  },
  {
    title: 'Movie Management System',
    topic: 'Web & Apps',
    desc: 'A web application for managing movie collections, including features for adding, editing, and deleting movie entries.',
    tech: ['JavaSwing', 'MySQL'],
    live: '#',
    github: 'https://github.com/husthunterpy01/Movie-Recommendation-System',
    img: movieMgmtImg
  },
  {
    title: 'Bee Sound Identification System',
    topic: 'AI & ML',
    desc: 'A published deep learning research project that analyzes hive audio using spectrograms and CNN models to classify bee colony health states. This work was accepted and published in Ecological Informatics (Elsevier, 2023).',
    tech: ['Python', 'Pytorch', 'Librosa', 'Wandb'],
    github: '#',        
    live: 'https://doi.org/10.1016/j.ecoinf.2023.102274', 
    img: beeImg
  }

];

const TOPICS = ['All', 'AI & ML', 'Web & Apps', 'MLOps & Data'];
const PAGE_SIZE_OPTIONS = [4, 6, 8, 'All'];

const Projects = () => {
  const [topic, setTopic] = useState('All');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const filtered = useMemo(
    () =>
      topic === 'All'
        ? projectData
        : projectData.filter((p) => p.topic === topic),
    [topic]
  );

  const perPage = pageSize === 'All' ? filtered.length || 1 : pageSize;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const changeTopic = (t) => {
    setTopic(t);
    setPage(1);
  };

  const changePageSize = (value) => {
    setPageSize(value === 'All' ? 'All' : Number(value));
    setPage(1);
  };

  const isMlopsTab = topic === 'MLOps & Data';

  return (
    <section id="projects" className="projects">
      <h2>My Projects</h2>

      <div
        className="project-filters"
        role="tablist"
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
              role="tab"
              aria-selected={topic === t}
              className={`project-filter ${topic === t ? 'active' : ''}`}
              onClick={() => changeTopic(t)}
            >
              {t}
              <span className="project-filter-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div
        className={`projects-grid${isMlopsTab ? ' projects-grid--mlops' : ''}`}
      >
        {paged.map((proj) => (
          <ProjectCard
            key={proj.title}
            title={proj.title}
            desc={proj.desc}
            tech={proj.tech}
            live={proj.live}
            github={proj.github}
            img={proj.img}
            topic={proj.topic}
          />
        ))}
      </div>

      <div className="projects-footer">
        <label className="projects-perpage">
          <span>Per page</span>
          <select
            value={pageSize}
            onChange={(e) => changePageSize(e.target.value)}
            aria-label="Projects per page"
          >
            {PAGE_SIZE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>

        {totalPages > 1 && (
          <div className="projects-pagination" aria-label="Project pages">
            <button
              type="button"
              className="page-btn page-arrow"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <FaChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={`page-btn ${currentPage === n ? 'active' : ''}`}
                onClick={() => setPage(n)}
                aria-label={`Page ${n}`}
                aria-current={currentPage === n ? 'page' : undefined}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              className="page-btn page-arrow"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      <a
        href={BLOG_URL}
        target="_blank"
        rel="noreferrer"
        className="blog-callout"
      >
        <span className="blog-callout-icon" aria-hidden="true">
          <FaPenNib />
        </span>
        <span className="blog-callout-text">
          <strong>Curious how these work under the hood?</strong>
          <span>I write about the mechanics on my blog.</span>
        </span>
        <span className="blog-callout-cta">
          Visit my blog
          <FaArrowRight aria-hidden="true" />
        </span>
      </a>
    </section>
  );
};

export default Projects;