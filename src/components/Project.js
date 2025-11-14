import React from 'react';
import ProjectCard from './ProjectCard';

const projectData = [
  {
    title: 'E-Commerce Platform',
    desc: 'Full-stack online store with Stripe & user auth',
    tech: ['React', 'Node.js', 'MongoDB'],
    live: 'https://example.com',
    github: 'https://github.com',
    img: '/images/ecom.png'
  },
  {
    title: 'Task Manager',
    desc: 'Real-time collaborative to-do app',
    tech: ['React', 'Firebase', 'Tailwind'],
    live: '#',
    github: '#',
    img: '/images/task.png'
  }
];

const Projects = () => {
  return React.createElement(
    'section',
    { id: 'projects', className: 'projects' },
    React.createElement('h2', null, 'My Projects'),
    React.createElement(
      'div',
      { className: 'projects-grid' },
      projectData.map((proj, i) =>
        React.createElement(ProjectCard, {
          key: i,
          title: proj.title,
          desc: proj.desc,
          tech: proj.tech,
          live: proj.live,
          github: proj.github,
          img: proj.img
        })
      )
    )
  );
};

export default Projects;