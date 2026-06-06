import React from 'react';
import ProjectCard from './ProjectCard';
import chatbotImg from '../image/proj_image/chatbot_proj.png';
import movieMgmtImg from '../image/proj_image/movie_proj.png';
import beeImg from '../image/proj_image/bee_proj.png';
import nliImg from '../image/proj_image/nli_proj.png';
import defaultImg from '../image/proj_image/project_placeholder.png';
import swanflipImg from '../image/proj_image/swan_flip.png';
// Personal project data
const projectData = [
  {
    title: 'RAG Summary Chatbot System',
    desc: 'A retrieval-augmented generation (RAG) chatbot that provides concise summaries from large documents for Ecommerce customer support.',
    tech: ['Python', 'Pytorch', 'MongoDB', 'Streamlit'],
    live: '#',
    github: 'https://github.com/husthunterpy01/Dialog-Summarization-System',
    img: chatbotImg
  },
    {
    title: 'Natural Language Inference with ESIM-based model',
    desc: 'Developed and evaluated multiple deep learning architectures for a Natural Language Inference (NLI) task using a novel dataset constructed from science-exam questions and web sentences. The goal was to determine entailment relations between premise–hypothesis pairs, focusing not just on model performance but on architecture innovation, ablation studies (particularly attention mechanisms), and qualitative interpretation of attention behaviour.',
    tech: ['Python', 'Pytorch', 'Nltk'],
    github: 'https://github.com/husthunterpy01/CITS4012/tree/main/Assignment2',        
    live: '', 
    img: nliImg
  },
  {
    title: 'MLops systems for GraphRag of youtube script analysis',
    desc: 'Coming soon.',
    tech: ['FastAPI','Nginx','Docker','AWS', 'Kubeflow', 'Ansible', 'Pytorch','Flink'],
    github: '' ,
    live: '',
    img: defaultImg
  },
  {
    title: 'Swanflip Marketplace - a UWA marketplace for students',
    desc: 'Developed a full-stack web application for UWA students to buy and sell second-hand items, featuring user authentication, product listings, search functionality, and a responsive design.',
    tech: ['Flask', 'SocketIO', 'Sqlite', 'TailwindCSS'],
    github: 'https://github.com/husthunterpy01/SwanFlip-Marketplace' ,
    live: '',
    img: swanflipImg
  },
  {
    title: 'Movie Management System',
    desc: 'A web application for managing movie collections, including features for adding, editing, and deleting movie entries.',
    tech: ['JavaSwing', 'MySQL'],
    live: '#',
    github: 'https://github.com/husthunterpy01/Movie-Recommendation-System',
    img: movieMgmtImg
  },
  {
    title: 'Bee Sound Identification System',
    desc: 'A published deep learning research project that analyzes hive audio using spectrograms and CNN models to classify bee colony health states. This work was accepted and published in Ecological Informatics (Elsevier, 2023).',
    tech: ['Python', 'Pytorch', 'Librosa', 'Wandb'],
    github: '#',        
    live: 'https://doi.org/10.1016/j.ecoinf.2023.102274', 
    img: beeImg
  }

];

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <h2>My Projects</h2>
      <div className="projects-grid">
        {projectData.map((proj, i) => (
          <ProjectCard
            key={i}
            title={proj.title}
            desc={proj.desc}
            tech={proj.tech}
            live={proj.live}
            github={proj.github}
            img={proj.img}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;